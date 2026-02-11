"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IntentModal } from "@/components/intent-modal";

export function GroupPageClient({
  productId,
  productName,
  isMember,
  isLoggedIn,
  currentUserId,
}: {
  productId: string;
  productName: string;
  isMember: boolean;
  isLoggedIn: boolean;
  currentUserId: string | null;
}) {
  const [showIntent, setShowIntent] = useState(false);

  if (isMember) {
    return (
      <div className="mt-4 rounded-xl bg-foreground/5 px-5 py-3 text-center">
        <p className="text-sm font-medium text-foreground/60">
          You&apos;re a member of this group
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-4 text-center">
        <Button
          onClick={() => setShowIntent(true)}
          size="lg"
          className="rounded-full border-2 border-foreground bg-foreground px-8 text-sm font-semibold text-background hover:bg-background hover:text-foreground"
        >
          Team up to buy
        </Button>
      </div>
      <IntentModal
        open={showIntent}
        onOpenChange={setShowIntent}
        productId={productId}
        productName={productName}
      />
    </>
  );
}
