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
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const users = [
    {
      id: 1,
      image: "/face-1.png",
    },
    {
      id: 2,
      image: "/face-2.jpeg",
    },
    {
      id: 3,
      image: "/face-3.png",
    },
    {
      id: 4,
      image: "/face-4.png",
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

    setLoading(true);

    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/notion/popup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, mobile, product }),
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
      <section className="flex flex-col items-center px-4 sm:px-6 lg:px-8 gap-y-4 sm:gap-y-0 mt-12 sm:mt-16">
        <Header />

        <CTA />

        <Form
          name={name}
          mobile={mobile}
          product={product}
          handleNameChange={handleNameChange}
          handleMobileChange={handleMobileChange}
          handleProductChange={handleProductChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 sm:mt-8"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-row items-center justify-center mb-1 gap-1"
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
            className="flex items-center justify-center"
          >
            <div className="flex w-fit items-center justify-center rounded-full border border-black-200 bg-transparent text-center">
              <div className="px-3 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm font-medium">
                🎉 2309+ users already joined
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-4 sm:mt-6 mb-12 sm:mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-1 text-xs sm:text-sm text-muted-foreground">
            <p>For any queries, reach out at </p>
            <Link
              href="https://wa.link/psnvgp"
              rel="noopener noreferrer"
              target="_blank">
              <FaWhatsapp className="h-4 w-4 sm:h-5 sm:w-5 transition-all duration-200 ease-linear hover:text-black" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <PopularProducts />

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
