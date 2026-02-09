"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type IntentModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  productName: string;
};

export function IntentModal({
  open,
  onOpenChange,
  productId,
  productName,
}: IntentModalProps) {
  const router = useRouter();
  const supabase = createClient();
  const [timeline, setTimeline] = useState<"immediately" | "1_2_weeks" | "after_month" | "">("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (open) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (!user) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      });
    }
  }, [open, supabase.auth]);

  const handleLogin = () => {
    // Store return URL so user comes back after login
    const returnUrl = window.location.pathname;
    router.push(`/login?redirect=${encodeURIComponent(returnUrl)}`);
    onOpenChange(false);
  };

  const handleSubmit = async () => {
    if (!timeline) {
      toast.error("Please select a buying timeline");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/groups/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          buyingTimeline: timeline,
          city: city.trim() || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to join group");
      }

      const data = await res.json();
      toast.success(`You've joined the ${productName} group!`);
      onOpenChange(false);
      router.push(`/groups/${productId}`);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {isAuthenticated === false ? (
          <>
            <DialogHeader>
              <DialogTitle>Sign in to continue</DialogTitle>
              <DialogDescription>
                You need to be logged in to join a buying group for{" "}
                <span className="font-medium text-black">{productName}</span>.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 pt-2">
              <Button onClick={handleLogin} className="w-full">
                Log in / Sign up
              </Button>
              <Button
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </>
        ) : isAuthenticated === true ? (
          <>
            <DialogHeader>
              <DialogTitle>Join the {productName} group</DialogTitle>
              <DialogDescription>
                Answer a quick question to get matched with other buyers.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-5 pt-2">
              {/* Question 1: Timeline */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  How soon are you willing to buy?
                </Label>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setTimeline("immediately")}
                    className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition ${
                      timeline === "immediately"
                        ? "border-black bg-black/5 text-black"
                        : "border-black/10 text-black/60 hover:border-black/30"
                    }`}
                  >
                    Immediately
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeline("1_2_weeks")}
                    className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition ${
                      timeline === "1_2_weeks"
                        ? "border-black bg-black/5 text-black"
                        : "border-black/10 text-black/60 hover:border-black/30"
                    }`}
                  >
                    1 - 2 weeks
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeline("after_month")}
                    className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition ${
                      timeline === "after_month"
                        ? "border-black bg-black/5 text-black"
                        : "border-black/10 text-black/60 hover:border-black/30"
                    }`}
                  >
                    After a month
                  </button>
                </div>
              </div>

              {/* Question 2: City (optional) */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  What&apos;s your city?{" "}
                  <span className="text-black/40">(optional)</span>
                </Label>
                <Input
                  placeholder="e.g. Bangalore"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={loading || !timeline}
                className="w-full rounded-full"
              >
                {loading ? "Joining..." : "Join Group"}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-black/20 border-t-black" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
