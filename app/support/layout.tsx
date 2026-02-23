import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Save More with Group Buying Company in India",
  description:
    "Our community buying platform brings people together to unlock better prices. Experience smart and easy group buying in India.",
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

