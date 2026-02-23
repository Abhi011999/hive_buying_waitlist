import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "India’s Trusted Group Buying & Community Buying Platform",
  description:
    "We are a group buying company in India helping communities buy together and save more on every purchase. Simple, smart, and transparent.",
};

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

