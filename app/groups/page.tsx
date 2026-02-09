import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Header from "@/components/header";
import { GroupCard } from "@/components/group-card";

export default async function MyGroupsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/groups");
  }

  // Fetch user's group memberships with product info
  const { data: memberships } = await supabase
    .from("group_members")
    .select("*, products(*)")
    .eq("user_id", user.id)
    .order("joined_at", { ascending: false });

  // Get member counts for each product
  const productIds = memberships?.map((m) => m.product_id) || [];
  const memberCountMap: Record<string, number> = {};

  if (productIds.length > 0) {
    const { data: allMembers } = await supabase
      .from("group_members")
      .select("product_id")
      .in("product_id", productIds);

    allMembers?.forEach((m) => {
      memberCountMap[m.product_id] = (memberCountMap[m.product_id] || 0) + 1;
    });
  }

  // Get last message for each group
  const lastMessageMap: Record<string, { content: string; created_at: string }> = {};
  for (const pid of productIds) {
    const { data: lastMsg } = await supabase
      .from("group_messages")
      .select("content, created_at")
      .eq("product_id", pid)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    if (lastMsg) {
      lastMessageMap[pid] = lastMsg;
    }
  }

  return (
    <main className="min-h-screen bg-white pb-20 sm:pb-0">
      <Header />
      <div className="mx-auto max-w-3xl px-4 pt-24 sm:px-6 sm:pt-28">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black sm:text-4xl">
            My Groups
          </h1>
          <p className="mt-2 text-base text-black/60">
            Groups you&apos;ve joined to buy together.
          </p>
        </div>

        {!memberships || memberships.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-black/10 py-16 text-center">
            <p className="text-lg text-black/40">
              You haven&apos;t joined any groups yet.
            </p>
            <Link
              href="/explore"
              className="mt-3 inline-block text-sm font-medium text-black underline underline-offset-4"
            >
              Explore products
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {memberships.map((membership) => {
              const product = membership.products as any;
              if (!product) return null;

              return (
                <GroupCard
                  key={membership.id}
                  membership={{ ...membership, products: product }}
                  memberCount={memberCountMap[product.id] || 0}
                  lastMessage={lastMessageMap[product.id]}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
