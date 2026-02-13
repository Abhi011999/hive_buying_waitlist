import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Header from "@/components/header";
import { Breadcrumb } from "@/components/breadcrumb";
import { ProductCard } from "@/components/product-card";
import { HOME_APPLIANCES_SUBCATEGORIES } from "@/lib/constants";
import { Tv, Wind, Refrigerator, WashingMachine, Home as HomeIcon } from "lucide-react";

export const revalidate = 60; // Cache for 60 seconds

type ProductImage = {
  id: string;
  image_url: string;
  display_order: number;
};

const subCategoryIconMap: Record<string, React.ElementType> = {
  AC: Wind,
  TV: Tv,
  Refrigerator: Refrigerator,
  "Washing Machine": WashingMachine,
};

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ subcategory?: string }>;
}) {
  const { category } = await params;
  const { subcategory } = await searchParams;
  const supabase = await createClient();

  // Fetch category
  const { data: cat } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("slug", category)
    .single();

  if (!cat) notFound();

  // Check if this is home appliances category
  const isHomeAppliances = cat.slug === "home-appliances" || cat.name.toLowerCase().includes("home appliances");

  // If subcategory filter is present, get the subcategory id
  let subcategoryId: string | null = null;
  if (isHomeAppliances && subcategory) {
    const { data: subCat } = await supabase
      .from("subcategories")
      .select("id")
      .eq("category_id", cat.id)
      .ilike("name", subcategory.replace(/-/g, " "))
      .single();
    subcategoryId = subCat?.id || null;
  }

  // Fetch products with only needed columns, filtered by subcategory if present
  let productsQuery = supabase
    .from("products")
    .select("id, name, slug, brand, image_url, description, target_group_size, discount_label")
    .eq("category_id", cat.id);
  
  if (subcategoryId) {
    productsQuery = productsQuery.eq("subcategory_id", subcategoryId);
  }
  
  const { data: products } = await productsQuery.order("name");

  // Get member counts and product images
  const productIds = products?.map((p) => p.id) || [];
  const countMap: Record<string, number> = {};
  const imagesMap: Record<string, ProductImage[]> = {};
  
  if (productIds.length > 0) {
    const [memberCountsResult, imagesResult] = await Promise.all([
      supabase.rpc('get_member_counts', {
        product_ids: productIds,
      }),
      supabase
        .from("product_images")
        .select("id, product_id, image_url, display_order")
        .in("product_id", productIds)
        .order("display_order"),
    ]);

    memberCountsResult.data?.forEach((item: any) => {
      countMap[item.product_id] = Number(item.member_count);
    });

    imagesResult.data?.forEach((img: any) => {
      if (!imagesMap[img.product_id]) {
        imagesMap[img.product_id] = [];
      }
      imagesMap[img.product_id].push({
        id: img.id,
        image_url: img.image_url,
        display_order: img.display_order,
      });
    });
  }

  return (
    <main className="min-h-screen bg-background pb-20 sm:pb-0">
      <Header />
      <div className="mx-auto max-w-5xl px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16">
        <Breadcrumb
          items={[
            { label: "Explore", href: "/explore" },
            { label: cat.name },
          ]}
        />

        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            {cat.name}
          </h1>
          <p className="mt-2 text-base text-foreground/60">
            Team up with others to get the best deal on these products.
          </p>
        </div>

        {/* Home Appliances Sub-categories - only show for home-appliances category */}
        {isHomeAppliances && (
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-foreground sm:text-xl">
              Browse by Type
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {/* All option */}
              <Link
                href={`/explore/${cat.slug}`}
                className={`group flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition hover:shadow-lg ${
                  !subcategory
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg transition ${
                  !subcategory ? "bg-primary/20" : "bg-accent/20 group-hover:bg-accent/30"
                }`}>
                  <HomeIcon className={`h-6 w-6 ${!subcategory ? "text-primary" : "text-foreground/60"}`} />
                </div>
                <span className={`text-sm font-semibold ${!subcategory ? "text-primary" : "text-foreground/80"}`}>
                  All
                </span>
              </Link>
              {HOME_APPLIANCES_SUBCATEGORIES.map((subCat) => {
                const SubIcon = subCategoryIconMap[subCat] || HomeIcon;
                const subCatSlug = subCat.toLowerCase();
                const isActive = subcategory === subCatSlug;
                return (
                  <Link
                    key={subCat}
                    href={`/explore/${cat.slug}?subcategory=${encodeURIComponent(subCatSlug)}`}
                    className={`group flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition hover:shadow-lg ${
                      isActive
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg transition ${
                      isActive ? "bg-primary/20" : "bg-accent/20 group-hover:bg-accent/30"
                    }`}>
                      <SubIcon className={`h-6 w-6 ${isActive ? "text-primary" : "text-foreground/60"}`} />
                    </div>
                    <span className={`text-sm font-semibold ${isActive ? "text-primary" : "text-foreground/80"}`}>
                      {subCat}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-5">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              memberCount={countMap[product.id] || 0}
              images={imagesMap[product.id] || []}
            />
          ))}

          {(!products || products.length === 0) && (
            <div className="rounded-2xl border-2 border-dashed border-foreground/10 py-16 text-center">
              <p className="text-lg text-foreground/40">
                No products available yet in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
