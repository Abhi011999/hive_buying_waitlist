"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, HeadphonesIcon, User, Compass } from "lucide-react";
import { useUnreadMessages } from "@/hooks/use-unread-messages";

const navItems = [
  { href: "/", label: "Home", icon: Home, exact: true },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/groups", label: "Groups", icon: Users, showBadge: true },
  { href: "/support", label: "Support", icon: HeadphonesIcon },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const { totalUnread } = useUnreadMessages();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-white/80 backdrop-blur-xl sm:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1 transition ${
                isActive ? "text-black" : "text-black/50"
              }`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${isActive ? "fill-black/10" : ""}`} />
                {item.showBadge && totalUnread > 0 && (
                  <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                    {totalUnread > 99 ? "99+" : totalUnread}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
