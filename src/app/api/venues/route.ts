import { NextResponse } from "next/server";
import { mockVenues } from "@/lib/mockData";

export async function GET() {
  try {
    return NextResponse.json(mockVenues);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch venues" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create venue" }, { status: 500 });
  }
}
