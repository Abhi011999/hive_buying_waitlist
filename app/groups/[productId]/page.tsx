import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Header from "@/components/header";
import { Breadcrumb } from "@/components/breadcrumb";
import { MessageBoard } from "@/components/message-board";
import { GroupPageClient } from "./client";
import {
  Users,
  Tag,
  Shield,
  Lock,
  BadgeCheck,
  Target,
} from "lucide-react";

export default async function GroupPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const supabase = await createClient();

  // Fetch product with category
  const { data: product } = await supabase
    .from("products")
    .select("*, categories(*)")
    .eq("id", productId)
    .single();

  if (!product) notFound();

  // Get member count
  const { count: memberCount } = await supabase
    .from("group_members")
    .select("*", { count: "exact", head: true })
    .eq("product_id", productId);

  // Check if current user is a member
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isMember = false;
  if (user) {
    const { data: membership } = await supabase
      .from("group_members")
      .select("id")
      .eq("product_id", productId)
      .eq("user_id", user.id)
      .single();
    isMember = !!membership;
  }

  const cat = product.categories as any;

  return (
    <main className="min-h-screen bg-white pb-20 sm:pb-0">
      <Header />
      <div className="mx-auto max-w-3xl px-4 pt-24 sm:px-6 sm:pt-28">
        <Breadcrumb
          items={[
            { label: "Explore", href: "/explore" },
            ...(cat
              ? [{ label: cat.name, href: `/explore/${cat.slug}` }]
              : []),
            { label: product.name },
          ]}
        />

        {/* Product header card */}
        <div className="mt-4 flex flex-col gap-4 rounded-2xl border-2 border-black/10 bg-gradient-to-br from-amber-50/60 to-white p-5 sm:flex-row sm:p-6">
          {/* Image */}
          <div className="flex h-40 items-center justify-center sm:h-auto sm:w-48">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="h-full w-full rounded-xl border border-black/10 object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-xl border-2 border-dashed border-black/15 bg-black/5 text-5xl">
                {product.brand?.charAt(0) || "?"}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-black">{product.name}</h1>
              {product.brand && (
                <p className="text-sm text-black/50">{product.brand}</p>
              )}
              {product.description && (
                <p className="mt-2 text-sm text-black/60">
                  {product.description}
                </p>
              )}

              {product.discount_label && (
                <div className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-amber-700">
                  <Tag className="h-4 w-4" />
                  {product.discount_label}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="mt-3 flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/70">
                <Target className="h-3.5 w-3.5" />
                Target: {product.target_group_size}
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                <Users className="h-3.5 w-3.5" />
                {memberCount || 0} joined
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-black/40">
                <Shield className="h-3.5 w-3.5" />
                Verified
              </div>
              <div className="flex items-center gap-1 text-xs text-black/40">
                <Lock className="h-3.5 w-3.5" />
                Secure
              </div>
              <div className="flex items-center gap-1 text-xs text-black/40">
                <BadgeCheck className="h-3.5 w-3.5" />
                Trusted
              </div>
            </div>
          </div>
        </div>

        {/* Social proof */}
        <div className="mt-6 rounded-xl bg-green-50 px-5 py-3 text-center">
          <p className="text-sm font-medium text-green-800">
            {memberCount && memberCount > 0
              ? `${memberCount} ${memberCount === 1 ? "person is" : "people are"} interested in buying this product`
              : "Be the first to join this buying group!"}
          </p>
        </div>

        {/* Join CTA for non-members */}
        <GroupPageClient
          productId={productId}
          productName={product.name}
          isMember={isMember}
          isLoggedIn={!!user}
          currentUserId={user?.id || null}
        />

        {/* Discussion section */}
        <div className="mt-6 mb-8">
          <h2 className="mb-3 text-lg font-bold text-black">Discussion</h2>
          <MessageBoard
            productId={productId}
            currentUserId={user?.id || null}
            isMember={isMember}
          />
        </div>
      </div>
    </main>
  );
}
