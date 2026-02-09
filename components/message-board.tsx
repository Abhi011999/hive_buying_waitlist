"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
};

export function MessageBoard({
  productId,
  currentUserId,
  isMember,
}: {
  productId: string;
  currentUserId: string | null;
  isMember: boolean;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMember || !currentUserId) {
      setLoading(false);
      return;
    }

    fetchMessages();
    // Poll every 10 seconds for new messages
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, [productId, isMember, currentUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/groups/${productId}/messages`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch {
      // Silently fail for polling
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const res = await fetch(`/api/groups/${productId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newMessage.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send");
      }

      const data = await res.json();
      setMessages((prev) => [...prev, data.message]);
      setNewMessage("");
    } catch (err: any) {
      toast.error(err.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  if (!isMember) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-black/10 p-8 text-center">
        <p className="text-sm text-black/40">
          Join this group to see and participate in the discussion.
        </p>
      </div>
    );
  }

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString();
  };

  return (
    <div className="flex flex-col rounded-2xl border-2 border-black/10 bg-white">
      {/* Messages list */}
      <div className="max-h-96 min-h-[200px] overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/20 border-t-black" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-sm text-black/40">
            No messages yet. Be the first to say hello!
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((msg) => {
              const isOwn = msg.user_id === currentUserId;
              const name =
                msg.profiles?.full_name || "Member";
              const initials = name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isOwn ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  {msg.profiles?.avatar_url ? (
                    <img
                      src={msg.profiles.avatar_url}
                      alt={name}
                      className="h-7 w-7 flex-shrink-0 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-black/10 text-[10px] font-semibold text-black/60">
                      {initials}
                    </div>
                  )}

                  {/* Message bubble */}
                  <div
                    className={`max-w-[75%] rounded-2xl px-3.5 py-2 ${
                      isOwn
                        ? "bg-black text-white"
                        : "bg-black/5 text-black"
                    }`}
                  >
                    {!isOwn && (
                      <p className="mb-0.5 text-[10px] font-semibold opacity-60">
                        {name}
                      </p>
                    )}
                    <p className="text-sm">{msg.content}</p>
                    <p
                      className={`mt-0.5 text-[10px] ${
                        isOwn ? "text-white/50" : "text-black/30"
                      }`}
                    >
                      {formatTime(msg.created_at)}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 border-t border-black/10 p-3"
      >
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border-black/10"
          maxLength={1000}
        />
        <Button
          type="submit"
          size="icon"
          disabled={sending || !newMessage.trim()}
          className="h-9 w-9 shrink-0 rounded-full"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
