import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Header from "@/components/header";
import Link from "next/link";
import { Users, Calendar, MessageSquare, TrendingUp, ChevronRight, Settings, HelpCircle, LogOut } from "lucide-react";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/profile");
  }

  // Fetch user stats
  const { count: groupsJoined } = await supabase
    .from("group_members")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const { count: messagesCount } = await supabase
    .from("group_messages")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  // Get first joined date
  const { data: firstGroup } = await supabase
    .from("group_members")
    .select("joined_at")
    .eq("user_id", user.id)
    .order("joined_at", { ascending: true })
    .limit(1)
    .single();

  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : null;

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email ||
    user.phone ||
    "User";

  const avatarUrl =
    user.user_metadata?.avatar_url || user.user_metadata?.picture || null;

  const initials = displayName
    .split(" ")
    .map((w: string) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const stats = [
    {
      label: "Groups Joined",
      value: groupsJoined || 0,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Messages Sent",
      value: messagesCount || 0,
      icon: MessageSquare,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Savings Unlocked",
      value: groupsJoined ? `${(groupsJoined || 0) * 5}%` : "0%",
      icon: TrendingUp,
      color: "bg-amber-50 text-amber-600",
      subtitle: "avg. discount",
    },
  ];

  const menuItems = [
    { label: "My Groups", href: "/groups", icon: Users },
    { label: "Support", href: "/support", icon: HelpCircle },
  ];

  return (
    <main className="min-h-screen bg-white pb-20 sm:pb-0">
      <Header />
      <div className="mx-auto max-w-md px-4 pt-24 sm:px-6 sm:pt-28">
        {/* Profile card */}
        <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-black/10 p-8">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="h-20 w-20 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black/10 text-xl font-bold text-black/60">
              {initials}
            </div>
          )}
          <div className="text-center">
            <h1 className="text-xl font-bold text-black">{displayName}</h1>
            {user.email && (
              <p className="mt-1 text-sm text-black/50">{user.email}</p>
            )}
            {user.phone && (
              <p className="mt-1 text-sm text-black/50">{user.phone}</p>
            )}
            {memberSince && (
              <p className="mt-2 flex items-center justify-center gap-1 text-xs text-black/40">
                <Calendar className="h-3 w-3" />
                Member since {memberSince}
              </p>
            )}
          </div>
        </div>

        {/* Stats grid */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-xl border border-black/5 bg-black/[0.02] p-4"
            >
              <div className={`rounded-full p-2 ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-black">{stat.value}</span>
              <span className="text-center text-[10px] leading-tight text-black/50">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-black/10">
          {menuItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3.5 transition hover:bg-black/[0.02] ${
                index !== menuItems.length - 1 ? "border-b border-black/5" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-black/40" />
                <span className="text-sm font-medium text-black">{item.label}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-black/30" />
            </Link>
          ))}
        </div>

        {/* Sign out */}
        <form action="/auth/signout" method="POST" className="mt-4">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </form>
      </div>
    </main>
  );
}
