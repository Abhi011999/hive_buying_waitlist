"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
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

interface ProductPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
}

const productCategories = [
  "Phones",
  "Laptops/Ipads",
  "Gadgets",
  "Scooty/Bike",
  "Cars",
  "Others",
];

export function ProductPopup({ open, onOpenChange, productName }: ProductPopupProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    product: productName,
  });

  // Update product when productName changes
  useEffect(() => {
    if (productName) {
      setFormData(prev => ({ ...prev, product: productName }));
    }
  }, [productName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/notion/popup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          product: formData.product,
        }),
      });

      if (response.ok) {
        toast.success("Thanks! We'll reach out soon 🎉");
        setFormData({ name: "", mobile: "", product: productName });
        onOpenChange(false);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to submit. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Team up to buy</DialogTitle>
          <DialogDescription>
            Share your details and we'll connect you with others interested in this product.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div>
            <Input
              type="tel"
              placeholder="Mobile number"
              value={formData.mobile}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                setFormData({ ...formData, mobile: value });
              }}
              maxLength={10}
              required
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
                <SelectValue placeholder="Select product category" />
              </SelectTrigger>
              <SelectContent>
                {productCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <EnhancedButton
            type="submit"
            variant="expandIcon"
            Icon={FaArrowRightLong}
            iconPlacement="right"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Join the Team!"}
          </EnhancedButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}

