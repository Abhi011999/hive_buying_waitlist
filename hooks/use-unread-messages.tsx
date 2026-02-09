"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";

type UnreadData = {
  unreadCounts: Record<string, number>;
  totalUnread: number;
  loading: boolean;
  refetch: () => Promise<void>;
  markAsRead: (productId: string) => Promise<void>;
};

const UnreadContext = createContext<UnreadData>({
  unreadCounts: {},
  totalUnread: 0,
  loading: true,
  refetch: async () => {},
  markAsRead: async () => {},
});

export function useUnreadMessages() {
  return useContext(UnreadContext);
}

export function UnreadMessagesProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<{ unreadCounts: Record<string, number>; totalUnread: number }>({ 
    unreadCounts: {}, 
    totalUnread: 0 
  });
  const [loading, setLoading] = useState(true);
  const [userGroups, setUserGroups] = useState<string[]>([]);
  const supabaseRef = useRef(createClient());
  const initializedRef = useRef(false);

  const fetchUnread = useCallback(async () => {
    try {
      const res = await fetch("/api/groups/unread");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize only once
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const init = async () => {
      const supabase = supabaseRef.current;
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      // Fetch unread counts
      fetchUnread();

      // Fetch user's groups
      const { data: memberships } = await supabase
        .from("group_members")
        .select("product_id")
        .eq("user_id", user.id);

      if (memberships) {
        setUserGroups(memberships.map((m) => m.product_id));
      }
    };

    init();
  }, [fetchUnread]);

  // Set up real-time subscription
  useEffect(() => {
    if (userGroups.length === 0) return;

    const supabase = supabaseRef.current;
    const channel = supabase
      .channel("unread-messages-global")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "group_messages",
        },
        async (payload) => {
          const newMsg = payload.new as any;
          
          if (!userGroups.includes(newMsg.product_id)) return;

          const { data: { user } } = await supabase.auth.getUser();
          if (!user || newMsg.user_id === user.id) return;

          setData((prev) => {
            const newCounts = { ...prev.unreadCounts };
            newCounts[newMsg.product_id] = (newCounts[newMsg.product_id] || 0) + 1;
            return {
              unreadCounts: newCounts,
              totalUnread: prev.totalUnread + 1,
            };
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userGroups]);

  const markAsRead = useCallback(async (productId: string) => {
    try {
      await fetch(`/api/groups/${productId}/read`, { method: "POST" });
      setData((prev) => {
        const count = prev.unreadCounts[productId] || 0;
        const newCounts = { ...prev.unreadCounts };
        delete newCounts[productId];
        return {
          unreadCounts: newCounts,
          totalUnread: Math.max(0, prev.totalUnread - count),
        };
      });
    } catch {
      // Silently fail
    }
  }, []);

  const value = useMemo(() => ({
    ...data,
    loading,
    refetch: fetchUnread,
    markAsRead,
  }), [data, loading, fetchUnread, markAsRead]);

  return (
    <UnreadContext.Provider value={value}>
      {children}
    </UnreadContext.Provider>
  );
}
