import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const VALID_PRODUCTS = [
  "Phones",
  "Laptops/Ipads",
  "Gadgets",
  "Scooty/Bike",
  "Cars",
  "Others",
];

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

  if (!VALID_PRODUCTS.includes(product)) {
    return NextResponse.json({ 
      success: false, 
      error: "Invalid product selection" 
    }, { status: 400 });
  }

  try {
    const notion = new Client({ 
      auth: process.env.NOTION_SECRET,
      notionVersion: "2022-06-28"
    });
    
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_POPUP_DB,
      },
      properties: {
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
        Date: {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
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

