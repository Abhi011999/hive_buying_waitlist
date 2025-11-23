"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import { EnhancedButton } from "@/components/ui/enhanced-btn";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRODUCT_CATEGORIES, LOCATIONS } from "@/lib/constants";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

interface ProductPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
}

export function ProductPopup({ open, onOpenChange, productName }: ProductPopupProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    product: productName,
    location: "",
    note: "",
  });

  // Update product when productName changes
  useEffect(() => {
    if (productName) {
      setFormData(prev => ({ ...prev, product: productName }));
    }
  }, [productName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error("Please enter your name 😠");
      return;
    }

    if (!formData.mobile) {
      toast.error("Please enter your mobile number 😠");
      return;
    }

    if (!formData.product) {
      toast.error("Please select a product category 😠");
      return;
    }

    if (!formData.location) {
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
          body: JSON.stringify({
            name: formData.name,
            mobile: formData.mobile,
            product: formData.product,
            location: formData.location,
            note: formData.note,
          }),
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
        setFormData({
          name: "",
          mobile: "",
          product: productName,
          location: "",
          note: "",
        });
        setSubmitted(true);
        setTimeout(() => {
          onOpenChange(false);
          setSubmitted(false);
        }, 2000);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[calc(100vw-2rem)] max-w-[380px] sm:max-w-[425px] max-h-[90vh] overflow-y-auto sm:overflow-y-visible sm:max-h-none !top-4 sm:!top-[50%] !translate-y-0 sm:!translate-y-[-50%]">
        <DialogHeader>
          <DialogTitle>{submitted ? "Thanks for being Awesome!" : "Be a part of us"}</DialogTitle>
          {!submitted && (
            <DialogDescription>
              Join the community and be part of the new way to buy.
            </DialogDescription>
          )}
        </DialogHeader>

        {!submitted && (
          <form onSubmit={handleSubmit} className="space-y-4 pb-2">
            <div>
              <Input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={loading}
              />
            </div>

            <div>
              <Input
                type="tel"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setFormData({ ...formData, mobile: value });
                }}
                maxLength={10}
                disabled={loading}
              />
            </div>

            <div>
              <Select
                value={formData.product}
                onValueChange={(value) => setFormData({ ...formData, product: value })}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Product Category" />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData({ ...formData, location: value })}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <textarea
                placeholder="Your Note (Optional)"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                rows={2}
                className="w-full text-sm sm:text-base bg-transparent border border-input rounded-md px-3 py-2 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                disabled={loading}
              />
            </div>

            <EnhancedButton
              type="submit"
              variant="expandIcon"
              Icon={FaArrowRightLong}
              iconPlacement="right"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </EnhancedButton>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

