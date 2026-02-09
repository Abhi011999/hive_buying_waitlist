import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check auth
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { productId, buyingTimeline, city } = body;

    // Validate
    if (!productId || typeof productId !== "string") {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    if (!["immediately", "1_2_weeks", "after_month"].includes(buyingTimeline)) {
      return NextResponse.json(
        { error: "Invalid buying timeline" },
        { status: 400 }
      );
    }

    // Check product exists
    const { data: product } = await supabase
      .from("products")
      .select("id")
      .eq("id", productId)
      .single();

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Upsert group membership (update if already a member)
    const { data, error } = await supabase
      .from("group_members")
      .upsert(
        {
          product_id: productId,
          user_id: user.id,
          buying_timeline: buyingTimeline,
          city: city || null,
        },
        { onConflict: "product_id,user_id" }
      )
      .select()
      .single();

    if (error) {
      console.error("Join group error:", error);
      return NextResponse.json(
        { error: "Failed to join group" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Join group error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
