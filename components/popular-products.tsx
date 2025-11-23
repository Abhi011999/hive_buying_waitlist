"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductPopup } from "./product-popup";

const products = [
  {
    id: 1,
    name: "Phones",
    image: "/phones.webp",
    hasImage: true,
    fillContainer: true,
    scale: "",
    hoverScale: "",
    brandCount: "12+",
    activeGroups: 17,
    categories: ["Apple", "Oppo", "Samsung", "+4"],
    groupName: "Techies",
    boughtTogether: 170,
    description: "Pick what you love from top brands",
  },
  {
    id: 2,
    name: "Laptops/Tablets",
    image: "/macbook-air-orange.webp",
    hasImage: true,
    fillContainer: true,
    scale: "",
    hoverScale: "",
    brandCount: "7+",
    activeGroups: 23,
    categories: ["HP", "Dell", "Apple", "+7"],
    groupName: "Students",
    boughtTogether: 145,
    description: "Pick your product from top brands",
  },
  {
    id: 3,
    name: "Gadgets",
    image: "/airpods-promax.webp",
    hasImage: true,
    fillContainer: true,
    scale: "",
    hoverScale: "",
    brandCount: "20+",
    activeGroups: 32,
    categories: ["Sony", "JBL", "Oneplus", "+18"],
    groupName: "Early Adopters",
    boughtTogether: 203,
    description: "Pick your product from top brands",
  },
  {
    id: 4,
    name: "Home Appliances",
    image: "/home-appliances.webp",
    hasImage: true,
    fillContainer: true,
    scale: "",
    hoverScale: "",
    brandCount: "15+",
    activeGroups: 18,
    categories: ["LG", "Samsung", "Voltas", "+8"],
    groupName: "Home Makers",
    boughtTogether: 134,
    description: "Pick your product from top brands",
  },
  {
    id: 5,
    name: "Scooty/Bike",
    image: "/bikes.webp",
    hasImage: true,
    fillContainer: true,
    scale: "",
    hoverScale: "",
    brandCount: "16+",
    activeGroups: 12,
    categories: ["Royal Enfield", "TVS", "Bajaj", "+3"],
    groupName: "Riders",
    boughtTogether: 89,
    description: "Pick your product from top brands",
  },
  {
    id: 6,
    name: "Cars",
    image: "/cars.webp",
    hasImage: true,
    fillContainer: true,
    scale: "",
    hoverScale: "",
    brandCount: "23+",
    activeGroups: 7,
    categories: ["Suzuki", "Mahindra", "Tata", "+2"],
    groupName: "Auto Enthusiasts",
    boughtTogether: 67,
    description: "Pick your product from top brands",
  },
];

export function PopularProducts() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

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
                  className="w-full max-w-sm mx-auto"
                >
                  {/* Product Card */}
                  <div 
                    className="w-full bg-gradient-to-br from-white to-gray-50/50 border-2 border-black rounded-3xl overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
                    onClick={() => setSelectedProduct(product.name)}
                  >
                    {/* Image Section */}
                    <div className="relative h-48 bg-white/50 border-2 border-black rounded-2xl m-4 overflow-hidden">
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

                    {/* Content Section */}
                    <div className="px-6 pb-6 space-y-4">
                      {/* Brand Description */}
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-800">
                          {product.description}
                        </p>
                        <p className="text-xs text-gray-700">
                          Choose from {product.brandCount} top brands
                        </p>
                      </div>

                      {/* Active Groups */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-900">
                          Active groups: {product.activeGroups}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {product.categories.map((category, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-0.5 bg-white/60 border border-black/20 rounded"
                            >
                              {category}
                            </span>
                          ))}
                          <p className="text-xs text-gray-700">
                            Bought together: {product.boughtTogether}
                          </p>
                        </div>
                      </div>

                      {/* Group Info */}
                      <div className="pt-2 border-t border-black/20 space-y-3">
                        <p className="text-sm font-bold text-gray-900">
                          {product.name} Group
                        </p>
                        <Button
                          onClick={() => setSelectedProduct(product.name)}
                          variant="outline"
                          size="sm"
                          className="font-medium w-fit border-black hover:bg-black hover:text-white text-xs px-3 py-1"
                        >
                          Team up to buy
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop: Horizontal Scroll with Navigation Arrows */}
            <div className="hidden sm:block">
              {/* Scroll Container */}
              <div ref={scrollContainerRef} className="overflow-x-auto pb-4 custom-scrollbar">
                <div className="flex gap-6 px-4 min-w-max">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="w-80"
                  >
                    {/* Product Card */}
                    <div 
                      className="w-full bg-gradient-to-br from-white to-gray-50/50 border-2 border-black rounded-3xl overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
                      onClick={() => setSelectedProduct(product.name)}
                    >
                      {/* Image Section */}
                      <div className="relative h-52 bg-white/50 border-2 border-black rounded-2xl m-4 overflow-hidden">
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

                      {/* Content Section */}
                      <div className="px-6 pb-6 space-y-4">
                        {/* Brand Description */}
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-800">
                            {product.description}
                          </p>
                          <p className="text-xs text-gray-700">
                            Choose from {product.brandCount} top brands
                          </p>
                        </div>

                        {/* Active Groups */}
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-gray-900">
                            Active groups: {product.activeGroups}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {product.categories.map((category, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-0.5 bg-white/60 border border-black/20 rounded"
                              >
                                {category}
                              </span>
                            ))}
                            <p className="text-xs text-gray-700">
                              Bought together: {product.boughtTogether}
                            </p>
                          </div>
                        </div>

                      {/* Group Info */}
                      <div className="pt-2 border-t border-black/20 space-y-3">
                        <p className="text-sm font-bold text-gray-900">
                          {product.name} Group
                        </p>
                        <Button
                          onClick={() => setSelectedProduct(product.name)}
                          variant="outline"
                          size="sm"
                          className="font-medium w-fit border-black hover:bg-black hover:text-white text-xs px-3 py-1"
                        >
                          Team up to buy
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              </div>
              </div>

              {/* Navigation Arrows - Bottom Right */}
              <div className="flex items-center justify-end gap-4 mt-6 px-4">
                <button
                  onClick={() => scroll('left')}
                  className="bg-white border-2 border-black rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="bg-white border-2 border-black rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
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

