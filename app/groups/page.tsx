import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Header from "@/components/header";
import { Users, ChevronRight, Tag } from "lucide-react";

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

              const count = memberCountMap[product.id] || 0;
              const lastMsg = lastMessageMap[product.id];

              return (
                <Link
                  key={membership.id}
                  href={`/groups/${product.id}`}
                  className="flex items-center gap-4 rounded-2xl border-2 border-black/10 p-4 transition hover:border-black/20 hover:shadow-md"
                >
                  {/* Product image */}
                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-black/5">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xl font-bold text-black/30">
                        {product.brand?.charAt(0) || "?"}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-black sm:text-base">
                      {product.name}
                    </h3>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="flex items-center gap-1 text-xs text-black/50">
                        <Users className="h-3 w-3" />
                        {count} members
                      </span>
                      {product.discount_label && (
                        <span className="flex items-center gap-1 text-xs text-amber-600">
                          <Tag className="h-3 w-3" />
                          {product.discount_label}
                        </span>
                      )}
                    </div>
                    {lastMsg && (
                      <p className="mt-1 truncate text-xs text-black/40">
                        {lastMsg.content}
                      </p>
                    )}
                  </div>

                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-black/30" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
