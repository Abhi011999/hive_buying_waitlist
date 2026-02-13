import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Header from "@/components/header";
import { Car, Bike, Smartphone, Home as HomeIcon } from "lucide-react";

export const revalidate = 60; // Cache for 60 seconds

const iconMap: Record<string, React.ElementType> = {
  Car: Car,
  Bike: Bike,
  Smartphone: Smartphone,
  Home: HomeIcon,
};

export default async function ExplorePage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("display_order");

  return (
    <main className="min-h-screen bg-background pb-20 sm:pb-0">
      <Header />
      <div className="mx-auto max-w-5xl px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Explore Categories
          </h1>
          <p className="mt-2 text-base text-foreground/60">
            Pick a category to find products and team up with other buyers.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {categories?.map((cat) => {
            const Icon = iconMap[cat.icon || ""] || HomeIcon;
            
            return (
              <Link
                key={cat.id}
                href={`/explore/${cat.slug}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-border bg-card p-6 transition hover:border-accent hover:shadow-lg"
              >
                {cat.image_url ? (
                  <div className="relative h-24 w-full overflow-hidden rounded-xl bg-accent/10">
                    <img
                      src={cat.image_url}
                      alt={cat.name}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex h-24 w-full items-center justify-center rounded-xl bg-accent/20">
                    <Icon className="h-10 w-10 text-foreground/50" />
                  </div>
                )}
                <span className="text-sm font-semibold text-foreground/80 sm:text-base">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
