import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Header from "@/components/header";
import { Breadcrumb } from "@/components/breadcrumb";
import { ProductCard } from "@/components/product-card";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const supabase = await createClient();

  // Fetch category
  const { data: cat } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", category)
    .single();

  if (!cat) notFound();

  // Fetch products directly under this category
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", cat.id)
    .order("name");

  // Get member counts for each product
  const productIds = products?.map((p) => p.id) || [];
  const { data: memberCounts } = await supabase
    .from("group_members")
    .select("product_id")
    .in("product_id", productIds);

  const countMap: Record<string, number> = {};
  memberCounts?.forEach((m) => {
    countMap[m.product_id] = (countMap[m.product_id] || 0) + 1;
  });

  return (
    <main className="min-h-screen bg-white pb-20 sm:pb-0">
      <Header />
      <div className="mx-auto max-w-5xl px-4 pt-24 sm:px-6 sm:pt-28">
        <Breadcrumb
          items={[
            { label: "Explore", href: "/explore" },
            { label: cat.name },
          ]}
        />

        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-bold text-black sm:text-4xl">
            {cat.name}
          </h1>
          <p className="mt-2 text-base text-black/60">
            Team up with others to get the best deal on these products.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              memberCount={countMap[product.id] || 0}
            />
          ))}

          {(!products || products.length === 0) && (
            <div className="rounded-2xl border-2 border-dashed border-black/10 py-16 text-center">
              <p className="text-lg text-black/40">
                No products available yet in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
