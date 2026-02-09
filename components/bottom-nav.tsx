"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, HeadphonesIcon, User, Compass } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home, exact: true },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/groups", label: "Groups", icon: Users },
  { href: "/support", label: "Support", icon: HeadphonesIcon },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-white/80 backdrop-blur-xl sm:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = item.external
            ? false
            : item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          if (item.external) {
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-0.5 px-3 py-1 text-black/50"
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition ${
                isActive ? "text-black" : "text-black/50"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "fill-black/10" : ""}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
