"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import CTA from "@/components/cta";
import Form from "@/components/form";
import HowItWorks from "@/components/how-it-works";
import Particles from "@/components/ui/particles";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { PopularProducts } from "@/components/popular-products";
import { BrandLogos } from "@/components/brand-logos";
import { BrandGallery } from "@/components/brand-gallery";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleMobileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(value);
  };

  const handleProductChange = (value: string) => {
    setProduct(value);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const handleSubmit = async () => {
    if (!name) {
      toast.error("Please enter your name 😠");
      return;
    }

    if (!mobile) {
      toast.error("Please enter your mobile number 😠");
      return;
    }

    if (!product) {
      toast.error("Please select a product category 😠");
      return;
    }

    if (!location) {
      toast.error("Please select your location 😠");
      return;
    }

    setLoading(true);

    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/notion/popup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, mobile, product, location, note }),
        });

        if (!response.ok) {
          if (response.status === 429) {
            reject("Rate limited");
          } else {
            reject("Submission failed");
          }
        } else {
          resolve({});
        }
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(promise, {
      loading: "Submitting your details... 🚀",
      success: (data) => {
        setName("");
        setMobile("");
        setProduct("");
        setLocation("");
        setNote("");
        setSubmitted(true);
        return "Thanks! We'll reach out soon 🎉";
      },
      error: (error) => {
        if (error === "Rate limited") {
          return "You're doing that too much. Please try again later";
        } else if (error === "Submission failed") {
          return "Failed to save your details. Please try again 😢.";
        }
        return "An error occurred. Please try again 😢.";
      },
    });

    promise.finally(() => {
      setLoading(false);
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-x-clip py-8 sm:py-0">
      <Header />
      
      <section className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-16 lg:gap-24 xl:gap-40 px-4 sm:px-6 lg:px-12 xl:px-16 mt-48 sm:mt-56 lg:mt-64 xl:mt-72 mb-20 sm:mb-28 lg:mb-32 xl:mb-40 w-full max-w-[90rem]">
        {/* Left side - CTA */}
        <div className="flex flex-col items-center lg:items-start lg:flex-1">
          <CTA />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-6 sm:mt-8"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-row items-center justify-center lg:justify-start mb-1 gap-1"
            >
              {users.map((user, idx) => (
                <img
                  key={user.id}
                  src={user.image}
                  alt={`User ${user.id}`}
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-white object-cover -ml-2 first:ml-0"
                />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-1 sm:mt-1.5"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start"
            >
              <div className="flex w-fit items-center justify-center rounded-full border border-black-200 bg-transparent text-center">
                <div className="px-3 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm font-medium">
                  🎉 12309+ people already joined
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-4 sm:mt-6"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-1 text-xs sm:text-sm text-muted-foreground">
              <p>For any queries, reach out at </p>
              <Link
                href="https://wa.link/psnvgp"
                rel="noopener noreferrer"
                target="_blank">
                <FaWhatsapp className="h-4 w-4 sm:h-5 sm:w-5 transition-all duration-200 ease-linear hover:text-black" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Right side - Form */}
        <div className="flex flex-col items-center lg:items-start lg:flex-1 lg:max-w-md mb-12 sm:mb-16 lg:mb-0">
          <Form
            name={name}
            mobile={mobile}
            product={product}
            location={location}
            note={note}
            handleNameChange={handleNameChange}
            handleMobileChange={handleMobileChange}
            handleProductChange={handleProductChange}
            handleLocationChange={handleLocationChange}
            handleNoteChange={handleNoteChange}
            handleSubmit={handleSubmit}
            loading={loading}
            submitted={submitted}
          />
        </div>
      </section>

      <BrandLogos />

      <PopularProducts />

      <BrandGallery />

      <div className="mt-6 sm:mt-8 mb-12 sm:mb-16">
        <HowItWorks />
      </div>

      <Particles
        quantityDesktop={350}
        quantityMobile={100}
        ease={80}
        color={"#000000"}
        refresh
      />

      <Footer />
    </main>
  );
}
