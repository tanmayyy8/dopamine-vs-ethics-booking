import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { paymentId, eventId, seats, customer, amount } = await req.json();

    if (!eventId || !seats || !customer) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // MOCK BOOKING (No Database)
    return NextResponse.json({ 
      success: true, 
      bookingId: "mock_booking_" + Math.random().toString(36).substring(2, 10),
      message: "Booking confirmed successfully"
    });
  } catch (error) {
    console.error("Booking Confirmation Error:", error);
    return NextResponse.json({ error: "Failed to confirm booking" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    return NextResponse.json([]);
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
