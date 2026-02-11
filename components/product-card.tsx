"use client";

import { useState, memo } from "react";
import { Users, Shield, Lock, BadgeCheck, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IntentModal } from "@/components/intent-modal";
import { ProductImageSlider } from "@/components/product-image-slider";

type Product = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  description: string | null;
  brand: string | null;
  target_group_size: number;
  discount_label: string | null;
};

type ProductImage = {
  id: string;
  image_url: string;
  display_order: number;
};

function ProductCardComponent({
  product,
  memberCount,
  images = [],
}: {
  product: Product;
  memberCount: number;
  images?: ProductImage[];
}) {
  const [showIntent, setShowIntent] = useState(false);

  return (
    <>
      <div className="flex flex-col overflow-hidden rounded-2xl border-2 border-border bg-card transition hover:shadow-lg sm:flex-row">
        {/* Left: Product image slider */}
        <div className="relative h-64 bg-accent/20 p-4 sm:h-auto sm:w-64 sm:min-h-[260px]">
          <ProductImageSlider
            images={images}
            productName={product.name}
            fallbackImage={product.image_url}
          />
        </div>

        {/* Right: Stats and info */}
        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
          {/* Product name and brand */}
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-foreground sm:text-xl">
                  {product.name}
                </h3>
                {product.brand && (
                  <p className="text-sm text-foreground/50">{product.brand}</p>
                )}
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70">
                <Users className="h-3.5 w-3.5" />
                Target: {product.target_group_size} members
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                <Users className="h-3.5 w-3.5" />
                {memberCount} joined
              </div>
            </div>

            {/* Discount label */}
            {product.discount_label && (
              <div className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-amber-700">
                <Tag className="h-4 w-4" />
                {product.discount_label}
              </div>
            )}

            {/* Description */}
            {product.description && (
              <p className="mt-2 text-sm text-foreground/60 line-clamp-2">
                {product.description}
              </p>
            )}

            {/* Trust icons */}
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

          {/* CTA */}
          <div className="mt-4">
            <Button
              onClick={() => setShowIntent(true)}
              className="rounded-full border-2 border-foreground bg-foreground px-6 text-sm font-semibold text-background hover:bg-background hover:text-foreground"
            >
              Team up to buy
            </Button>
          </div>
        </div>
      </div>

      <IntentModal
        open={showIntent}
        onOpenChange={setShowIntent}
        productId={product.id}
        productName={product.name}
      />
    </>
  );
}

// Export memoized version to prevent unnecessary re-renders in lists
export const ProductCard = memo(ProductCardComponent);
