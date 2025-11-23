import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";
import { PRODUCT_CATEGORIES, LOCATIONS } from "@/lib/constants";

export async function POST(request: Request) {
  const body = await request.json();
  
  if (!process.env.NOTION_SECRET) {
    return NextResponse.json({ 
      success: false, 
      error: "Missing NOTION_SECRET" 
    }, { status: 500 });
  }

  if (!process.env.NOTION_POPUP_DB) {
    return NextResponse.json({ 
      success: false, 
      error: "Missing NOTION_POPUP_DB" 
    }, { status: 500 });
  }

  // Field validations
  const name = body?.name?.trim();
  const mobile = body?.mobile?.trim();
  const product = body?.product?.trim();
  const location = body?.location?.trim();
  const note = body?.note?.trim() || "";

  // Validate name
  if (!name || name.length === 0) {
    return NextResponse.json({ 
      success: false, 
      error: "Name is required" 
    }, { status: 400 });
  }

  if (name.length < 2) {
    return NextResponse.json({ 
      success: false, 
      error: "Name must be at least 2 characters" 
    }, { status: 400 });
  }

  if (name.length > 100) {
    return NextResponse.json({ 
      success: false, 
      error: "Name must be less than 100 characters" 
    }, { status: 400 });
  }

  // Validate phone
  if (!mobile || mobile.length === 0) {
    return NextResponse.json({ 
      success: false, 
      error: "Phone number is required" 
    }, { status: 400 });
  }

  // Phone validation: exactly 10 digits
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(mobile)) {
    return NextResponse.json({ 
      success: false, 
      error: "Please enter a valid 10-digit phone number" 
    }, { status: 400 });
  }

  // Validate product
  if (!product || product.length === 0) {
    return NextResponse.json({ 
      success: false, 
      error: "Product selection is required" 
    }, { status: 400 });
  }

  if (!PRODUCT_CATEGORIES.includes(product as any)) {
    return NextResponse.json({ 
      success: false, 
      error: "Invalid product selection" 
    }, { status: 400 });
  }

  // Validate location
  if (!location || location.length === 0) {
    return NextResponse.json({ 
      success: false, 
      error: "Location is required" 
    }, { status: 400 });
  }

  if (!LOCATIONS.includes(location as any)) {
    return NextResponse.json({ 
      success: false, 
      error: "Invalid location selection" 
    }, { status: 400 });
  }

  try {
    const notion = new Client({ 
      auth: process.env.NOTION_SECRET,
      notionVersion: "2022-06-28"
    });
    
    const properties: any = {
      Name: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
      Phone: {
        phone_number: mobile,
      },
      "Product interested": {
        select: {
          name: product,
        },
      },
      Location: {
        rich_text: [
          {
            text: {
              content: location,
            },
          },
        ],
      },
      Date: {
        date: {
          start: new Date().toISOString(),
        },
      },
    };

    // Add note if provided
    if (note && note.length > 0) {
      properties["Your Note"] = {
        rich_text: [
          {
            text: {
              content: note,
            },
          },
        ],
      };
    }

    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_POPUP_DB,
      },
      properties,
    });

    console.log("Popup lead created:", response.id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Notion Popup API Error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      status: error?.status,
      code: error?.code,
      body: error?.body
    });
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}

