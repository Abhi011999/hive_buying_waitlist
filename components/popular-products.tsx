"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductPopup } from "./product-popup";

const products = [
  {
    id: 1,
    name: "Phones",
    image: "/iphone_17pro.webp",
    hasImage: true,
    scale: "scale-[1.0]",
    hoverScale: "group-hover:scale-[1.1]",
  },
  {
    id: 2,
    name: "Laptops/Ipads",
    image: "/macbook-air-orange.webp",
    hasImage: true,
    fillContainer: true,
  },
  {
    id: 3,
    name: "Gadgets",
    image: "/airpods-promax.webp",
    hasImage: true,
    fillContainer: true,
  },
  {
    id: 4,
    name: "Scooty/Bike",
    image: "/royal_enfield.webp",
    hasImage: true,
    fillContainer: true,
  },
  {
    id: 5,
    name: "Cars",
    image: "/scorpio_n.webp",
    hasImage: true,
    fillContainer: true,
  },
];

export function PopularProducts() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-semibold mb-3">
              Most Bought Together
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Top products people are buying together right now.
            </p>
          </motion.div>

          {/* Grid - Vertical on mobile, Horizontal on desktop */}
          <div className="relative">
            {/* Mobile: Vertical Stack */}
            <div className="flex flex-col gap-6 px-4 sm:hidden">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center gap-3"
                >
                  {/* Product Card */}
                  <div 
                    className="w-full max-w-sm h-64 bg-black border border-border rounded-xl overflow-hidden hover:border-primary transition-colors group cursor-pointer relative"
                    onClick={() => setSelectedProduct(product.name)}
                  >
                    {product.hasImage ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className={`${product.fillContainer ? 'object-cover group-hover:scale-110' : 'object-contain'} ${product.scale || ''} ${product.hoverScale || ''} transition-transform`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl group-hover:scale-110 transition-transform">📦</span>
                      </div>
                    )}
                  </div>

                  {/* Product Name */}
                  <h3 className="text-xl font-semibold text-center">
                    {product.name}
                  </h3>

                  {/* CTA Button */}
                  <Button
                    onClick={() => setSelectedProduct(product.name)}
                    variant="outline"
                    className="font-medium w-full max-w-sm"
                  >
                    Team up to buy
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Desktop: Horizontal Scroll */}
            <div className="hidden sm:block overflow-x-auto pb-4 custom-scrollbar">
              <div className="flex gap-6 px-4 min-w-max">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center gap-4"
                  >
                    {/* Product Card */}
                    <div 
                      className="w-64 h-64 bg-black border border-border rounded-xl overflow-hidden hover:border-primary transition-colors group cursor-pointer relative"
                      onClick={() => setSelectedProduct(product.name)}
                    >
                      {product.hasImage ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className={`${product.fillContainer ? 'object-cover group-hover:scale-110' : 'object-contain'} ${product.scale || ''} ${product.hoverScale || ''} transition-transform`}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-6xl group-hover:scale-110 transition-transform">📦</span>
                        </div>
                      )}
                    </div>

                    {/* Product Name */}
                    <h3 className="text-xl font-semibold text-center">
                      {product.name}
                    </h3>

                    {/* CTA Button */}
                    <Button
                      onClick={() => setSelectedProduct(product.name)}
                      variant="outline"
                      className="font-medium"
                    >
                      Team up to buy
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Form */}
      {selectedProduct && (
        <ProductPopup
          open={!!selectedProduct}
          onOpenChange={(open) => !open && setSelectedProduct(null)}
          productName={selectedProduct}
        />
      )}
    </>
  );
}

