import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  
  // Check for required environment variables
  if (!process.env.NOTION_SECRET) {
    console.error("NOTION_SECRET environment variable is not set");
    return NextResponse.json({ 
      success: false, 
      error: "Missing NOTION_SECRET" 
    }, { status: 500 });
  }

  if (!process.env.NOTION_DB) {
    console.error("NOTION_DB environment variable is not set");
    return NextResponse.json({ 
      success: false, 
      error: "Missing NOTION_DB" 
    }, { status: 500 });
  }

  try {
    const notion = new Client({ 
      auth: process.env.NOTION_SECRET,
      notionVersion: "2022-06-28"
    });
    
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DB,
      },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: body?.email || "New Subscriber",
              },
            },
          ],
        },
        Email: {
          email: body?.email || null,
        },
      },
    });

    console.log("Notion page created successfully:", response.id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Notion API Error details:", {
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
