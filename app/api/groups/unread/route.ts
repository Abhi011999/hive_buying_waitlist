import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ unreadCounts: {}, totalUnread: 0 });
  }

  // Get user's group memberships
  const { data: memberships } = await supabase
    .from("group_members")
    .select("product_id")
    .eq("user_id", user.id);

  if (!memberships || memberships.length === 0) {
    return NextResponse.json({ unreadCounts: {}, totalUnread: 0 });
  }

  const productIds = memberships.map((m) => m.product_id);

  // Get last read timestamps for each group
  const { data: readStatuses } = await supabase
    .from("group_read_status")
    .select("product_id, last_read_at")
    .eq("user_id", user.id)
    .in("product_id", productIds);

  const lastReadMap: Record<string, string> = {};
  readStatuses?.forEach((rs) => {
    lastReadMap[rs.product_id] = rs.last_read_at;
  });

  // Count unread messages for each group
  const unreadCounts: Record<string, number> = {};
  let totalUnread = 0;

  for (const pid of productIds) {
    const lastRead = lastReadMap[pid];
    
    let query = supabase
      .from("group_messages")
      .select("*", { count: "exact", head: true })
      .eq("product_id", pid)
      .neq("user_id", user.id); // Don't count user's own messages

    if (lastRead) {
      query = query.gt("created_at", lastRead);
    }

    const { count } = await query;
    const unreadCount = count || 0;
    
    if (unreadCount > 0) {
      unreadCounts[pid] = unreadCount;
      totalUnread += unreadCount;
    }
  }

  return NextResponse.json({ unreadCounts, totalUnread });
}
