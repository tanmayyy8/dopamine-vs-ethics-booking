import { NextResponse } from "next/server";
import { mockVenues } from "@/lib/mockData";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const venue = mockVenues.find(v => v.id === params.id) || mockVenues[0];
  return NextResponse.json(venue);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ success: true });
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ success: true });
}
