"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedShinyText from "@/components/ui/shimmer-text";
import { ProductPopup } from "@/components/product-popup";

export default function ScrollCTABar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(53 * 60); // 53 minutes in seconds

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isNearBottom = scrollPosition + windowHeight >= documentHeight - 100;

      // Show bar when scrolled down more than 300px, but hide if near bottom
      if (scrollPosition > 300 && !isNearBottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 53 * 60)); // Reset when reaches 0
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-40 w-full px-6 py-4 sm:px-8 md:px-12 lg:px-16"
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              borderTop: "1px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                  Secure a spot before the group fills!
                </p>
                <p className="text-xs text-gray-500 whitespace-nowrap">
                  33 slots left
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsPopupOpen(true)}
                className="flex items-center justify-center rounded-full border border-black/20 bg-black/5 px-4 py-1.5 text-xs font-semibold text-black/80 transition duration-200 hover:bg-black/10 hover:border-black/40 sm:text-sm flex-shrink-0"
              >
                <AnimatedShinyText className="text-xs font-semibold text-black/80 sm:text-sm">
                  Join the Community!
                </AnimatedShinyText>
              </button>

              <div className="flex flex-col items-end flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                  Next group starting shortly...
                </p>
                <p className="text-xs text-gray-500 whitespace-nowrap font-mono">
                  00:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ProductPopup
        open={isPopupOpen}
        onOpenChange={setIsPopupOpen}
        productName=""
      />
    </>
  );
}

