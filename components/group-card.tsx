"use client";

import Link from "next/link";
import { Users, ChevronRight, Tag } from "lucide-react";
import { useUnreadMessages } from "@/hooks/use-unread-messages";

type GroupCardProps = {
  membership: {
    id: string;
    product_id: string;
    products: {
      id: string;
      name: string;
      brand: string | null;
      image_url: string | null;
      discount_label: string | null;
    };
  };
  memberCount: number;
  lastMessage?: { content: string; created_at: string };
};

export function GroupCard({ membership, memberCount, lastMessage }: GroupCardProps) {
  const { unreadCounts } = useUnreadMessages();
  const product = membership.products;
  const unreadCount = unreadCounts[product.id] || 0;

  return (
    <Link
      href={`/groups/${product.id}`}
      className="flex items-center gap-4 rounded-2xl border-2 border-black/10 p-4 transition hover:border-black/20 hover:shadow-md"
    >
      {/* Product image */}
      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-black/5">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xl font-bold text-black/30">
            {product.brand?.charAt(0) || "?"}
          </div>
        )}
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-black sm:text-base">
          {product.name}
        </h3>
        <div className="mt-0.5 flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs text-black/50">
            <Users className="h-3 w-3" />
            {memberCount} members
          </span>
          {product.discount_label && (
            <span className="flex items-center gap-1 text-xs text-amber-600">
              <Tag className="h-3 w-3" />
              {product.discount_label}
            </span>
          )}
        </div>
        {lastMessage && (
          <p className={`mt-1 truncate text-xs ${unreadCount > 0 ? "font-medium text-black/70" : "text-black/40"}`}>
            {lastMessage.content}
          </p>
        )}
      </div>

      <ChevronRight className="h-4 w-4 flex-shrink-0 text-black/30" />
    </Link>
  );
}
