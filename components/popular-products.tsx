"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Phones",
    slug: "phones",
    image: "/phones.webp",
    hasImage: true,
    fillContainer: true,
    scale: "",
    hoverScale: "",
    brandCount: "12+",
    activeGroups: 17,
    categories: ["Samsung", "OnePlus", "Apple", "+4"],
    groupName: "Techies",
    boughtTogether: 170,
    description: "Pick what you love from top brands",
  },
  {
    id: 2,
    name: "Gadgets",
    slug: "gadgets",
    image: "/airpods-promax.webp",
    hasImage: true,
    fillContainer: true,
    scale: "",
    hoverScale: "",
    brandCount: "20+",
    activeGroups: 32,
    categories: ["Apple", "Marshall", "Sony", "+18"],
    groupName: "Early Adopters",
    boughtTogether: 203,
    description: "Pick your product from top brands",
  },
  {
    id: 3,
    name: "Home Appliances",
    slug: "home-appliances",
    image: "/home-appliances.webp",
    hasImage: true,
    fillContainer: true,
    scale: "",
    hoverScale: "",
    brandCount: "15+",
    activeGroups: 18,
    categories: ["Samsung", "Sony", "Voltas", "+8"],
    groupName: "Home Makers",
    boughtTogether: 134,
    description: "Pick your product from top brands",
  },
  {
    id: 4,
    name: "Bikes",
    slug: "bikes",
    image: "/bikes.webp",
    hasImage: true,
    fillContainer: true,
    scale: "",
    hoverScale: "",
    brandCount: "16+",
    activeGroups: 12,
    categories: ["Royal Enfield", "Triumph", "TVS", "+3"],
    groupName: "Riders",
    boughtTogether: 89,
    description: "Pick your product from top brands",
  },
  {
    id: 5,
    name: "Cars",
    slug: "cars",
    image: "/cars.webp",
    hasImage: true,
    fillContainer: true,
    scale: "",
    hoverScale: "",
    brandCount: "23+",
    activeGroups: 7,
    categories: ["Maruti", "Mahindra", "Tata", "+2"],
    groupName: "Auto Enthusiasts",
    boughtTogether: 67,
    description: "Pick your product from top brands",
  },
];

export function PopularProducts() {
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
                <Link 
                  href={`/explore/${product.slug}`}
                  className="block w-full bg-card border-2 border-border rounded-3xl overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
                >
                  {/* Image Section */}
                  <div className="relative h-48 bg-accent/10 border-2 border-border rounded-2xl m-4 overflow-hidden">
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
                      <p className="text-sm font-medium text-foreground/80">
                        {product.description}
                      </p>
                      <p className="text-xs text-foreground/70">
                        Choose from {product.brandCount} top brands
                      </p>
                    </div>

                    {/* Active Groups */}
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-foreground">
                        Active groups: {product.activeGroups}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.categories.map((category, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-0.5 bg-accent/30 border border-border rounded"
                          >
                            {category}
                          </span>
                        ))}
                        <p className="text-xs text-foreground/70">
                          Bought together: {product.boughtTogether}
                        </p>
                      </div>
                    </div>

                    {/* Group Info */}
                    <div className="pt-2 border-t border-foreground/20 space-y-3">
                      <p className="text-sm font-bold text-foreground">
                        {product.name} Group
                      </p>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="font-medium w-fit border-foreground hover:bg-foreground hover:text-background text-xs px-3 py-1"
                      >
                        <span>Explore</span>
                      </Button>
                    </div>
                  </div>
                </Link>
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
                  <Link 
                    href={`/explore/${product.slug}`}
                    className="block w-full bg-card border-2 border-border rounded-3xl overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
                  >
                    {/* Image Section */}
                    <div className="relative h-52 bg-accent/10 border-2 border-border rounded-2xl m-4 overflow-hidden">
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
                        <p className="text-sm font-medium text-foreground/80">
                          {product.description}
                        </p>
                        <p className="text-xs text-foreground/70">
                          Choose from {product.brandCount} top brands
                        </p>
                      </div>

                      {/* Active Groups */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-foreground">
                          Active groups: {product.activeGroups}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {product.categories.map((category, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-0.5 bg-card/60 border border-foreground/20 rounded"
                            >
                              {category}
                            </span>
                          ))}
                          <p className="text-xs text-foreground/70">
                            Bought together: {product.boughtTogether}
                          </p>
                        </div>
                      </div>

                    {/* Group Info */}
                    <div className="pt-2 border-t border-foreground/20 space-y-3">
                      <p className="text-sm font-bold text-foreground">
                        {product.name} Group
                      </p>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="font-medium w-fit border-foreground hover:bg-foreground hover:text-background text-xs px-3 py-1"
                      >
                        <span>Explore</span>
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            </div>
            </div>

            {/* Navigation Arrows - Bottom Right */}
            <div className="flex items-center justify-end gap-4 mt-6 px-4">
              <button
                onClick={() => scroll('left')}
                className="bg-card border-2 border-foreground rounded-full p-2 shadow-lg hover:bg-muted transition-all"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="bg-card border-2 border-foreground rounded-full p-2 shadow-lg hover:bg-muted transition-all"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Explore Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <a
            href="/explore"
            className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-foreground px-8 py-3 text-base font-semibold text-background transition hover:bg-background hover:text-foreground"
          >
            Explore All Categories
            <ChevronRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

