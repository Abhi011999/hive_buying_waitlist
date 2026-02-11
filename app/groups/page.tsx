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

  // Get member counts and last messages in parallel (optimized)
  const productIds = memberships?.map((m) => m.product_id) || [];
  const memberCountMap: Record<string, number> = {};
  const lastMessageMap: Record<string, { content: string; created_at: string }> = {};

  if (productIds.length > 0) {
    // Parallelize member counts and last messages fetch
    const [memberCountsResult, lastMessagesResult] = await Promise.all([
      // Use RPC to get aggregated member counts in a single query
      supabase.rpc('get_member_counts', { product_ids: productIds }),
      // Use window function to get last message per product in single query
      supabase
        .from("group_messages")
        .select("product_id, content, created_at")
        .in("product_id", productIds)
        .order("created_at", { ascending: false })
    ]);

    // Process member counts
    if (memberCountsResult.data) {
      memberCountsResult.data.forEach((item: any) => {
        memberCountMap[item.product_id] = item.member_count;
      });
    }

    // Process last messages - group by product_id and take first (most recent)
    if (lastMessagesResult.data) {
      const messagesByProduct: Record<string, any[]> = {};
      lastMessagesResult.data.forEach((msg: any) => {
        if (!messagesByProduct[msg.product_id]) {
          messagesByProduct[msg.product_id] = [];
        }
        messagesByProduct[msg.product_id].push(msg);
      });
      
      // Take the most recent message for each product
      Object.keys(messagesByProduct).forEach((pid) => {
        const messages = messagesByProduct[pid];
        if (messages.length > 0) {
          lastMessageMap[pid] = {
            content: messages[0].content,
            created_at: messages[0].created_at
          };
        }
      });
    }
  }

  return (
    <main className="min-h-screen bg-background pb-20 sm:pb-0">
      <Header />
      <div className="mx-auto max-w-3xl px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            My Groups
          </h1>
          <p className="mt-2 text-base text-foreground/60">
            Groups you&apos;ve joined to buy together.
          </p>
        </div>

        {!memberships || memberships.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-foreground/10 py-16 text-center">
            <p className="text-lg text-foreground/40">
              You haven&apos;t joined any groups yet.
            </p>
            <Link
              href="/explore"
              className="mt-3 inline-block text-sm font-medium text-foreground underline underline-offset-4"
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
