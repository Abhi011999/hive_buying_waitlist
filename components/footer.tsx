import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function Footer() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-auto flex w-full items-center justify-center border-t bg-background py-6 px-4 text-muted-foreground">
      <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 text-sm">
        <span className="text-black flex items-center gap-1">
          <span>©</span>
          <span>HiveBuying 2025</span>
        </span>
        <span className="text-black">|</span>
        <Link
          href="/faqs"
          className="text-black underline underline-offset-2 transition-all duration-200 ease-linear hover:opacity-60">
          FAQs
        </Link>
        <span className="text-black">|</span>
        <Link
          href="/privacy"
          className="text-black underline underline-offset-2 transition-all duration-200 ease-linear hover:opacity-60">
          Privacy Policy
        </Link>
      </motion.div>
    </motion.div>
  );
}
