import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const supabase = await createClient();

    // Check auth
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check membership
    const { data: membership } = await supabase
      .from("group_members")
      .select("id")
      .eq("product_id", productId)
      .eq("user_id", user.id)
      .single();

    if (!membership) {
      return NextResponse.json(
        { error: "You must be a group member to view messages" },
        { status: 403 }
      );
    }

    // Fetch messages with only required columns
    const { data: messages, error } = await supabase
      .from("group_messages")
      .select("id, content, created_at, user_id")
      .eq("product_id", productId)
      .order("created_at", { ascending: true })
      .limit(100);

    if (error) {
      console.error("Fetch messages error:", error);
      return NextResponse.json(
        { error: "Failed to fetch messages" },
        { status: 500 }
      );
    }

    // Fetch profiles for message authors
    const userIds = [...new Set(messages?.map((m) => m.user_id) || [])];
    let profilesMap: Record<string, { full_name: string | null; avatar_url: string | null }> = {};
    
    if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url")
        .in("id", userIds);
      
      profiles?.forEach((p) => {
        profilesMap[p.id] = { full_name: p.full_name, avatar_url: p.avatar_url };
      });

      // For users without profile names, try to get from auth metadata
      for (const userId of userIds) {
        if (!profilesMap[userId]?.full_name) {
          // Check if this is the current user - we can get their metadata
          if (userId === user.id) {
            const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0];
            const avatar = user.user_metadata?.avatar_url || user.user_metadata?.picture;
            if (name || avatar) {
              profilesMap[userId] = {
                full_name: name || profilesMap[userId]?.full_name || null,
                avatar_url: avatar || profilesMap[userId]?.avatar_url || null,
              };
            }
          }
        }
      }
    }

    // Attach profiles to messages
    const messagesWithProfiles = messages?.map((m) => ({
      ...m,
      profiles: profilesMap[m.user_id] || null,
    }));

    return NextResponse.json({ messages: messagesWithProfiles });
  } catch (err) {
    console.error("Fetch messages error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const supabase = await createClient();

    // Check auth
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check membership
    const { data: membership } = await supabase
      .from("group_members")
      .select("id")
      .eq("product_id", productId)
      .eq("user_id", user.id)
      .single();

    if (!membership) {
      return NextResponse.json(
        { error: "You must be a group member to post messages" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { content } = body;

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 }
      );
    }

    if (content.length > 1000) {
      return NextResponse.json(
        { error: "Message too long (max 1000 chars)" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("group_messages")
      .insert({
        product_id: productId,
        user_id: user.id,
        content: content.trim(),
      })
      .select("id, content, created_at, user_id, product_id")
      .single();

    if (error) {
      console.error("Post message error:", error);
      return NextResponse.json(
        { error: "Failed to post message" },
        { status: 500 }
      );
    }

    // Fetch profile for the message author
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, avatar_url")
      .eq("id", user.id)
      .single();

    // Use user metadata as fallback for name/avatar
    const fullName = profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || null;
    const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture || null;

    return NextResponse.json({ 
      message: {
        ...data,
        profiles: {
          full_name: fullName,
          avatar_url: avatarUrl,
        },
      }
    });
  } catch (err) {
    console.error("Post message error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
