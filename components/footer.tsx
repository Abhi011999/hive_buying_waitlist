import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t bg-background px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden">
      {/* Footer content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto pt-6 pb-2"
      >
        <div className="flex flex-row items-start justify-between gap-6">
          {/* Left side - Logo and copyright */}
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <div className="text-xs text-gray-600">
              <p>Copyright © 2025 HiveBuying</p>
              <p>All rights reserved</p>
            </div>
          </motion.div>

          {/* Right side - Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row sm:gap-6">
            <Link
              href="/faqs"
              className="text-xs text-gray-600 hover:text-black transition-colors duration-200 underline underline-offset-2">
              FAQs
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-gray-600 hover:text-black transition-colors duration-200 underline underline-offset-2">
              Privacy Policy
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Large background text */}
      <div className="relative flex items-center justify-center pointer-events-none overflow-hidden py-4 sm:py-2 lg:-my-4">
        <h2 
          className="text-[3.5rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-bold text-gray-100 select-none whitespace-nowrap px-4"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
          }}
        >
          HIVEBUYING
        </h2>
      </div>
    </footer>
  );
}
