"use client";

import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotificationPrompt() {
  const [show, setShow] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    if (!("Notification" in window)) return;

    setPermission(Notification.permission);

    // Show prompt if permission not yet decided and user hasn't dismissed
    const dismissed = localStorage.getItem("notification-prompt-dismissed");
    if (Notification.permission === "default" && !dismissed) {
      // Delay showing the prompt
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleEnable = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);
    setShow(false);

    if (result === "granted") {
      // Show a test notification
      new Notification("Notifications enabled!", {
        body: "You'll now receive updates when someone messages in your groups.",
        icon: "/favicon.svg",
      });
    }
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem("notification-prompt-dismissed", "true");
  };

  if (!show || permission !== "default") return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 sm:bottom-4 sm:left-auto sm:right-4 sm:w-80">
      <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-xl">
        <button
          onClick={handleDismiss}
          className="absolute right-3 top-3 text-black/30 hover:text-black/60"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
            <Bell className="h-5 w-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-black">
              Enable notifications
            </h3>
            <p className="mt-1 text-xs text-black/60">
              Get notified when someone messages in your buying groups.
            </p>
            <div className="mt-3 flex gap-2">
              <Button
                size="sm"
                onClick={handleEnable}
                className="h-8 rounded-full text-xs"
              >
                Enable
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismiss}
                className="h-8 rounded-full text-xs"
              >
                Not now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
