"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

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
      <div className="h-8 w-16 animate-pulse rounded-full bg-black/5" />
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden text-xs text-black/60 sm:inline sm:text-sm">
          {user.email || user.phone}
        </span>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center rounded-full border border-black/20 bg-black/5 px-4 py-1.5 text-xs font-semibold text-black/80 transition duration-200 hover:bg-black/10 hover:border-black/40 sm:text-sm"
        >
          Logout
        </button>
      </div>
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
