"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

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
  const supabaseRef = useRef(createClient());
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = supabaseRef.current;
    
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
  }, []);

  if (loading) {
    return (
      <div className="h-9 w-9 animate-pulse rounded-full bg-white/10" />
    );
  }

  if (user) {
    const avatarUrl = getAvatarUrl(user);
    const initials = getInitials(user);
    const displayName = getDisplayName(user);
    const firstName = getFirstName(user);

    return (
      <Link
        href="/profile"
        className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1 pl-3 pr-1 transition duration-200 hover:border-white/40 hover:ring-2 hover:ring-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
      >
        <span className="text-xs font-semibold text-white sm:text-sm">
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
            <span className="flex h-full w-full items-center justify-center bg-white/20 text-[10px] font-semibold text-white">
              {initials}
            </span>
          )}
        </div>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white transition duration-200 hover:bg-white/20 hover:border-white/50 sm:text-sm"
      >
        Log in
      </Link>
      <Link
        href="/signup"
        className="flex items-center justify-center rounded-full border-2 border-white bg-white px-4 py-1.5 text-xs font-semibold text-[#1a2226] transition duration-200 hover:bg-white/90 sm:text-sm"
      >
        Sign up
      </Link>
    </div>
  );
}
