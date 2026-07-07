import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, eventType, expectedDate, city, attendeeCount, budget, details } = body;

    if (!name || !email || !phone || !eventType || !details) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // MOCK DB (No Database)
    const inquiry = {
      id: "mock_inquiry_1",
      name, email, phone, eventType, expectedDate, city, attendeeCount, budget, details,
      status: "PENDING"
    };

    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error) {
    console.error("Failed to submit event hosting inquiry:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
