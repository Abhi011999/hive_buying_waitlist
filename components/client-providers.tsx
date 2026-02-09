"use client";

import { NotificationProvider } from "@/hooks/use-notifications";
import { NotificationPrompt } from "@/components/notification-prompt";
import { UnreadMessagesProvider } from "@/hooks/use-unread-messages";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <UnreadMessagesProvider>
      <NotificationProvider>
        {children}
        <NotificationPrompt />
      </NotificationProvider>
    </UnreadMessagesProvider>
  );
}
