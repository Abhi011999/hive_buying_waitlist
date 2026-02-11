import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Header from "@/components/header";
import { Breadcrumb } from "@/components/breadcrumb";
import { MessageBoard } from "@/components/message-board";
import { GroupPageClient } from "./client";
import { ProductImageSlider } from "@/components/product-image-slider";
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

  // Parallelize all data fetching to reduce waterfall
  const [
    productResult,
    memberCountResult,
    authResult,
    imagesResult,
  ] = await Promise.all([
    // Fetch product with category
    supabase
      .from("products")
      .select("id, name, brand, description, image_url, discount_label, target_group_size, categories(id, name, slug)")
      .eq("id", productId)
      .single(),
    // Get member count
    supabase
      .from("group_members")
      .select("*", { count: "exact", head: true })
      .eq("product_id", productId),
    // Check if current user is logged in
    supabase.auth.getUser(),
    // Fetch product images
    supabase
      .from("product_images")
      .select("id, image_url, display_order")
      .eq("product_id", productId)
      .order("display_order"),
  ]);

  const product = productResult.data;
  if (!product) notFound();

  const memberCount = memberCountResult.count;
  const user = authResult.data?.user;
  const productImages = imagesResult.data || [];

  // Check membership if user is logged in
  let isMember = false;
  if (user) {
    const { data: membership } = await supabase
      .from("group_members")
      .select("id")
      .eq("product_id", productId)
      .eq("user_id", user.id)
      .maybeSingle();
    isMember = !!membership;
  }

  const cat = product.categories as any;

  return (
    <main className="min-h-screen bg-background pb-20 sm:pb-0">
      <Header />
      <div className="mx-auto max-w-3xl px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16">
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
        <div className="mt-4 flex flex-col gap-4 rounded-2xl border-2 border-border bg-card p-5 sm:flex-row sm:p-6">
          {/* Image Slider */}
          <div className="h-56 sm:h-auto sm:w-56 sm:min-h-[200px]">
            <ProductImageSlider
              images={productImages}
              productName={product.name}
              fallbackImage={product.image_url}
            />
          </div>

          {/* Info */}
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{product.name}</h1>
              {product.brand && (
                <p className="text-sm text-foreground/50">{product.brand}</p>
              )}
              {product.description && (
                <p className="mt-2 text-sm text-foreground/60">
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
              <div className="flex items-center gap-1.5 rounded-full bg-accent/30 px-3 py-1 text-xs font-medium text-foreground/70">
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
              <div className="flex items-center gap-1 text-xs text-foreground/40">
                <Shield className="h-3.5 w-3.5" />
                Verified
              </div>
              <div className="flex items-center gap-1 text-xs text-foreground/40">
                <Lock className="h-3.5 w-3.5" />
                Secure
              </div>
              <div className="flex items-center gap-1 text-xs text-foreground/40">
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
        <div className="mt-6">
          <h2 className="mb-3 text-lg font-bold text-foreground">Discussion</h2>
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
