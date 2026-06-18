"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { FaInstagram, FaXTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t bg-background px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden">
      {/* Footer content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto pt-6 pb-20 sm:pb-2"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Left side - Logo and copyright */}
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <div className="text-xs text-muted-foreground">
              <p>Copyright © 2025 HiveBuying</p>
              <p>All rights reserved</p>
            </div>
          </motion.div>

          {/* Right side - Links and Socials */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            {/* Social Icons */}
            <div className="flex items-center gap-5">
              <Link
                href="https://x.com/hivebuying?s=21"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <FaXTwitter size={18} />
              </Link>
              <Link
                href="https://www.instagram.com/hivebuying/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <FaInstagram size={18} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/hivebuying/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <FaLinkedinIn size={18} />
              </Link>
              <Link
                href="https://www.youtube.com/@Hivebuying"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <FaYoutube size={20} />
              </Link>
            </div>

            {/* Legal Links */}
            <div className="flex gap-4 sm:gap-6">
              <Link
                href="/blog"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 underline underline-offset-2">
                Blog
              </Link>
              <Link
                href="/faqs"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 underline underline-offset-2">
                FAQs
              </Link>
              <Link
                href="/privacy"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 underline underline-offset-2">
                Privacy Policy
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Large background text */}
      <div className="relative hidden sm:flex items-center justify-center pointer-events-none overflow-hidden py-2 lg:-my-4 w-full">
        <h2 
          className="font-bold text-gray-100 select-none whitespace-nowrap text-[16rem]"
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
