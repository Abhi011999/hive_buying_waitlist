"use client";

import { useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

// Check if notifications are supported
const isNotificationSupported = () => {
  if (typeof window === "undefined") return false;
  return "Notification" in window;
};

// Check if it's Safari on iOS (which doesn't support web notifications without PWA)
const isIOSSafari = () => {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  const iOSSafari = iOS && webkit && !ua.match(/CriOS/i) && !ua.match(/FxiOS/i);
  return iOSSafari;
};

export function useNotifications() {
  const permissionRef = useRef<NotificationPermission>("default");

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if (!isNotificationSupported()) {
      return false;
    }

    // iOS Safari doesn't support notifications outside of PWA
    if (isIOSSafari()) {
      return false;
    }

    if (Notification.permission === "granted") {
      permissionRef.current = "granted";
      return true;
    }

    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      permissionRef.current = permission;
      return permission === "granted";
    }

    return false;
  }, []);

  // Show a notification
  const showNotification = useCallback(
    (title: string, options?: NotificationOptions) => {
      if (!isNotificationSupported()) return;
      if (permissionRef.current !== "granted") return;

      try {
        const notification = new Notification(title, {
          icon: "/favicon.svg",
          badge: "/favicon.svg",
          ...options,
        });

        notification.onclick = () => {
          window.focus();
          notification.close();
          if (options?.data?.url) {
            window.location.href = options.data.url;
          }
        };

        // Auto close after 5 seconds
        setTimeout(() => notification.close(), 5000);
      } catch (e) {
        // Safari might throw on some notification options
        console.warn("Notification error:", e);
      }
    },
    []
  );

  return { requestPermission, showNotification, permission: permissionRef.current };
}

// Component to handle real-time notifications
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { showNotification } = useNotifications();
  const supabaseRef = useRef(createClient());
  const userIdRef = useRef<string | null>(null);
  const userGroupsRef = useRef<string[]>([]);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const supabase = supabaseRef.current;

    // Get current user and their groups
    const setup = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Don't auto-request permission - let the NotificationPrompt handle it
      // Just set up the subscription for when permission is granted

      userIdRef.current = user.id;

      const { data: memberships } = await supabase
        .from("group_members")
        .select("product_id")
        .eq("user_id", user.id);

      if (memberships) {
        userGroupsRef.current = memberships.map((m) => m.product_id);
      }

      // Subscribe to new messages
      const channel = supabase
        .channel("notifications-global")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "group_messages",
          },
          async (payload) => {
            const newMsg = payload.new as any;

            // Only notify for messages in user's groups, not from themselves
            if (!userGroupsRef.current.includes(newMsg.product_id)) return;
            if (newMsg.user_id === userIdRef.current) return;

            // Don't notify if page is focused
            if (document.hasFocus()) return;

            // Check permission before making API calls
            if (!isNotificationSupported() || Notification.permission !== "granted") return;

            // Get sender's profile
            const { data: profile } = await supabase
              .from("profiles")
              .select("full_name")
              .eq("id", newMsg.user_id)
              .single();

            // Get product name
            const { data: product } = await supabase
              .from("products")
              .select("name")
              .eq("id", newMsg.product_id)
              .single();

            const senderName = profile?.full_name || "Someone";
            const groupName = product?.name || "a group";

            showNotification(`${senderName} in ${groupName}`, {
              body: newMsg.content.length > 100 
                ? newMsg.content.substring(0, 100) + "..." 
                : newMsg.content,
              tag: `message-${newMsg.product_id}`,
              data: { url: `/groups/${newMsg.product_id}` },
            });
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };

    setup();
  }, [showNotification]);

  return <>{children}</>;
}
