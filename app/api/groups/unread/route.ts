import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ unreadCounts: {}, totalUnread: 0 });
    }

    // Get user's group memberships
    const { data: memberships, error: membershipError } = await supabase
      .from("group_members")
      .select("product_id")
      .eq("user_id", user.id);

    if (membershipError) {
      console.error("Membership fetch error:", membershipError);
      return NextResponse.json({ unreadCounts: {}, totalUnread: 0 });
    }

    if (!memberships || memberships.length === 0) {
      return NextResponse.json({ unreadCounts: {}, totalUnread: 0 });
    }

    const productIds = memberships.map((m) => m.product_id);

    // Use RPC function to get unread counts efficiently in a single query
    const { data: unreadData, error: unreadError } = await supabase.rpc('get_unread_counts', {
      p_user_id: user.id,
      product_ids: productIds,
    });

    if (unreadError) {
      console.error("Unread counts error:", unreadError);
      return NextResponse.json({ unreadCounts: {}, totalUnread: 0 });
    }

    const unreadCounts: Record<string, number> = {};
    let totalUnread = 0;

    if (unreadData) {
      unreadData.forEach((item: { product_id: string; unread_count: number }) => {
        const count = Number(item.unread_count);
        if (count > 0) {
          unreadCounts[item.product_id] = count;
          totalUnread += count;
        }
      });
    }

    return NextResponse.json({ unreadCounts, totalUnread });
  } catch (error) {
    console.error("Unread API error:", error);
    return NextResponse.json({ unreadCounts: {}, totalUnread: 0 });
  }
}
