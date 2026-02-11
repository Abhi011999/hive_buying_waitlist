"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, HeadphonesIcon, Compass } from "lucide-react";
import { AuthButtons } from "@/components/auth-buttons";
import { useUnreadMessages } from "@/hooks/use-unread-messages";

const navLinks = [
  { href: "/", label: "Home", icon: Home, exact: true },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/groups", label: "Active Groups", icon: Users, showBadge: true },
  { href: "/support", label: "Support", icon: HeadphonesIcon },
];

export default function Header() {
  const pathname = usePathname();
  const { totalUnread } = useUnreadMessages();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full px-6 py-3 sm:px-8 md:px-12 lg:px-16"
      style={{
        background: "rgba(26, 34, 38, 0.95)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(185, 196, 200, 0.2)",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <Link href="/">
          <img
            src="/hive-buying-black-logo.svg"
            alt="HiveBuying full text logo"
            className="h-8 w-auto object-contain sm:h-12"
            style={{ filter: 'invert(1) brightness(2)' }}
          />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
                {link.showBadge && totalUnread > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                    {totalUnread > 99 ? "99+" : totalUnread}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <AuthButtons />
        </div>
      </div>
    </header>
  );
}
