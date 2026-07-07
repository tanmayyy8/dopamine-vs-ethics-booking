import { NextResponse } from "next/server";
import { mockEvents } from "@/lib/mockData";

export async function GET() {
  try {
    return NextResponse.json(mockEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
