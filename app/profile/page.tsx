import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Header from "@/components/header";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/profile");
  }

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

  return (
    <main className="min-h-screen bg-white pb-20 sm:pb-0">
      <Header />
      <div className="mx-auto max-w-md px-4 pt-24 sm:px-6 sm:pt-28">
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
          </div>
        </div>
      </div>
    </main>
  );
}
