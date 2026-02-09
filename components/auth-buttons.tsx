"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function getInitials(user: User): string {
  const name =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email ||
    user.phone ||
    "?";
  return name
    .split(" ")
    .map((w: string) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getDisplayName(user: User): string {
  return (
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email ||
    user.phone ||
    "User"
  );
}

function getFirstName(user: User): string {
  const full =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    user.phone ||
    "User";
  return full.split(" ")[0];
}

function getAvatarUrl(user: User): string | null {
  return (
    user.user_metadata?.avatar_url ||
    user.user_metadata?.picture ||
    null
  );
}

export function AuthButtons() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
  };

  if (loading) {
    return (
      <div className="h-9 w-9 animate-pulse rounded-full bg-black/5" />
    );
  }

  if (user) {
    const avatarUrl = getAvatarUrl(user);
    const initials = getInitials(user);
    const displayName = getDisplayName(user);
    const firstName = getFirstName(user);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-full border border-black/15 bg-black/5 py-1 pl-3 pr-1 transition duration-200 hover:border-black/30 hover:ring-2 hover:ring-black/10 focus:outline-none focus:ring-2 focus:ring-black/20">
            <span className="text-xs font-semibold text-black/70 sm:text-sm">
              {firstName}
            </span>
            <div className="relative h-7 w-7 overflow-hidden rounded-full">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={displayName}
                  width={28}
                  height={28}
                  className="h-full w-full rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-black/10 text-[10px] font-semibold text-black/70">
                  {initials}
                </span>
              )}
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-center gap-3">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={displayName}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-xs font-semibold text-black/70">
                  {initials}
                </div>
              )}
              <div className="flex flex-col space-y-0.5">
                <p className="text-sm font-medium leading-none">{displayName}</p>
                {user.email && displayName !== user.email && (
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                )}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="flex items-center justify-center rounded-full border border-black/20 bg-black/5 px-4 py-1.5 text-xs font-semibold text-black/80 transition duration-200 hover:bg-black/10 hover:border-black/40 sm:text-sm"
      >
        Log in
      </Link>
      <Link
        href="/signup"
        className="flex items-center justify-center rounded-full border border-transparent bg-black px-4 py-1.5 text-xs font-semibold text-white transition duration-200 hover:bg-black/80 sm:text-sm"
      >
        Sign up
      </Link>
    </div>
  );
}
