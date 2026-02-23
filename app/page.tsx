import type { Metadata } from "next";
import HomePage from "@/components/home-page";

export const metadata: Metadata = {
  title: "Best Group Buying Company in India | Smart Community Buying",
  description:
    "Join a trusted group buying company in India. Our community buying platform helps people purchase together, save money, and get better deals.",
  keywords: [
    "group buying company in India",
    "community buying platform",
    "smart community buying",
    "save more with group buying",
    "trusted group buying platform",
  ],
};

export default function Page() {
  return <HomePage />;
}
