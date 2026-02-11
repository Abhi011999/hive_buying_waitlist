"use client";

import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";

type ProductImage = {
  id: string;
  image_url: string;
  display_order: number;
};

export function ProductImageSlider({
  images,
  productName,
  fallbackImage,
}: {
  images: ProductImage[];
  productName: string;
  fallbackImage?: string | null;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // If no images in the gallery, use fallback
  const allImages = images.length > 0 
    ? images 
    : fallbackImage 
      ? [{ id: "fallback", image_url: fallbackImage, display_order: 0 }]
      : [];

  if (allImages.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-xl border-2 border-dashed border-border bg-accent/20 text-5xl text-foreground/30">
        ?
      </div>
    );
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset < -threshold || velocity < -500) {
      // Swiped left - go to next
      if (currentIndex < allImages.length - 1) {
        setDirection(1);
        setCurrentIndex(currentIndex + 1);
      }
    } else if (offset > threshold || velocity > 500) {
      // Swiped right - go to previous
      if (currentIndex > 0) {
        setDirection(-1);
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  // Single image - no slider needed
  if (allImages.length === 1) {
    return (
      <div className="flex h-full w-full flex-col">
        <div className="relative flex-1 overflow-hidden rounded-xl border border-border">
          <img
            src={allImages[0].image_url}
            alt={productName}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      {/* Main Image - Draggable */}
      <div className="relative flex-1 overflow-hidden rounded-xl border border-border">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={currentIndex}
            src={allImages[currentIndex].image_url}
            alt={`${productName} - Image ${currentIndex + 1}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 h-full w-full object-cover cursor-grab active:cursor-grabbing"
            draggable={false}
          />
        </AnimatePresence>

        {/* Image Counter */}
        <div className="absolute bottom-3 right-3 z-10 rounded-full bg-foreground/60 px-2.5 py-1 text-xs font-medium text-background">
          {currentIndex + 1} / {allImages.length}
        </div>
      </div>

      {/* Thumbnail Dots */}
      <div className="mt-2 flex justify-center gap-1.5 py-1">
        {allImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-200",
              index === currentIndex
                ? "bg-foreground w-5"
                : "bg-foreground/20 hover:bg-foreground/40 w-2"
            )}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
