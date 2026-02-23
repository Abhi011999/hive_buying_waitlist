"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import HowItWorks from "@/components/how-it-works";
import Particles from "@/components/ui/particles";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { PopularProducts } from "@/components/popular-products";
import { BrandLogos } from "@/components/brand-logos";
import { BrandGallery } from "@/components/brand-gallery";
import TextBlur from "@/components/ui/text-blur";
import { FlipWords } from "@/components/ui/flip-words";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function HomePage() {
  const users = [
    {
      id: 1,
      image: "/face-1.webp",
    },
    {
      id: 2,
      image: "/face-2.webp",
    },
    {
      id: 3,
      image: "/face-3.webp",
    },
    {
      id: 4,
      image: "/face-4.webp",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-x-clip">
      <Header />

      {/* Hero Section with Background Image */}
      <section className="relative w-full min-h-screen flex items-center justify-center">
        {/* Background Image - Landscape for desktop, Portrait for mobile */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
          style={{ backgroundImage: "url('/hero-portrait.jpg')" }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
          style={{ backgroundImage: "url('/hero-landscape.jpg')" }}
        />

        {/* Black overlay for better text readability */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-6 sm:px-8 lg:px-16 xl:px-24 py-32 w-full max-w-6xl">
          <motion.div
            className="flex w-full max-w-4xl flex-col gap-1 sm:gap-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-center text-4xl font-medium tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
                <FlipWords
                  words={["Team Up & Pay Less!", "Better Together!", "Enjoy Savings with Strangers!"]}
                  duration={3000}
                  className="text-white"
                />
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <TextBlur
                className="mx-auto max-w-[38rem] pt-2 text-center text-base sm:text-lg md:text-xl text-white/90"
                text="We help you pay less by not buying alone."
                duration={0.8}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <TextBlur
                className="mx-auto max-w-[38rem] pt-1 text-center text-sm sm:text-base md:text-lg text-white/80"
                text="When people who want the same product come together and buy as a group, everyone gets a better price than buying alone."
                duration={0.8}
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 sm:mt-10"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-row items-center justify-center mb-2 gap-1"
            >
              {users.map((user) => (
                <img
                  key={user.id}
                  src={user.image}
                  alt={`User ${user.id}`}
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-white object-cover -ml-3 first:ml-0"
                />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-2"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center"
            >
              <div className="flex w-fit items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-center">
                <div className="px-4 py-1.5 text-sm sm:text-base font-medium text-white">
                  🎉 12309+ people already joined
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-6"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 text-sm sm:text-base text-white/70"
            >
              <p>For any queries, reach out at </p>
              <Link
                href="https://wa.link/5vzeno"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaWhatsapp className="h-5 w-5 sm:h-6 sm:w-6 transition-all duration-200 ease-linear hover:text-white text-white/70" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <PopularProducts />

      <BrandGallery />

      <BrandLogos />

      <div className="mt-6 sm:mt-8 mb-12 sm:mb-16">
        <HowItWorks />
      </div>

      <Particles
        quantityDesktop={350}
        quantityMobile={100}
        ease={80}
        color={"#1a2226"}
        refresh
      />

      <Footer />
      {/* <WhatsappFloatingWidget /> */}
    </main>
  );
}
