"use client";

import { useState } from "react";
import AnimatedShinyText from "@/components/ui/shimmer-text";
import { ProductPopup } from "@/components/product-popup";
import { AuthButtons } from "@/components/auth-buttons";

export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
    <header 
      className="fixed top-0 left-0 right-0 z-50 w-full px-6 py-3 sm:px-8 md:px-12 lg:px-16"
      style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <img
          src="/hive-buying-black-logo.svg"
          alt="HiveBuying full text logo"
          className="h-8 w-auto object-contain sm:h-16"
        />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPopupOpen(true)}
            className="flex items-center justify-center rounded-full border border-black/20 bg-black/5 px-4 py-1.5 text-xs font-semibold text-black/80 transition duration-200 hover:bg-black/10 hover:border-black/40 sm:text-sm"
          >
            <AnimatedShinyText className="text-xs font-semibold text-black/80 sm:text-sm">
              Join the Community!
            </AnimatedShinyText>
          </button>
          <AuthButtons />
        </div>
      </div>
    </header>

    <ProductPopup
      open={isPopupOpen}
      onOpenChange={setIsPopupOpen}
      productName=""
    />
    </>
  );
}
