import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Create an awesome Venue (like a stadium)
    const venue = await prisma.venue.create({
      data: {
        name: "Grand Arena (BookMyShow Style)",
        type: "SEAT_MAP",
        address: "Mumbai, India",
        sections: {
          create: [
            {
              name: "Platinum (Front)",
              seats: {
                create: Array.from({ length: 30 }).map((_, i) => ({
                  row: "P",
                  column: i + 1,
                  label: `P-${i + 1}`
                }))
              }
            },
            {
              name: "Gold (Middle)",
              seats: {
                create: Array.from({ length: 40 }).map((_, i) => ({
                  row: "G",
                  column: i + 1,
                  label: `G-${i + 1}`
                }))
              }
            },
            {
              name: "Silver (Back)",
              seats: {
                create: Array.from({ length: 50 }).map((_, i) => ({
                  row: "S",
                  column: i + 1,
                  label: `S-${i + 1}`
                }))
              }
            }
          ]
        }
      },
      include: {
        sections: {
          include: {
            seats: true
          }
        }
      }
    });

    // 2. Create the Event
    const event = await prisma.event.create({
      data: {
        title: "Coldplay: Music of the Spheres",
        date: new Date("2026-12-31T20:00:00Z"),
        category: "Concert",
        imageUrl: "https://images.unsplash.com/photo-1540039155732-d68a05c6d3bf?q=80&w=2070",
        venueId: venue.id
      }
    });

    // 3. Generate EventSeats
    const eventSeatsData: any[] = [];
    for (const section of venue.sections) {
      const price = section.name.includes("Platinum") ? 15000 : 
                    section.name.includes("Gold") ? 8000 : 3500;
      
      for (const seat of section.seats) {
        // Randomly mark some seats as SOLD or BLOCKED for realism
        const rand = Math.random();
        let status = "AVAILABLE";
        if (rand < 0.1) status = "SOLD";
        else if (rand < 0.15) status = "BLOCKED";

        eventSeatsData.push({
          eventId: event.id,
          seatId: seat.id,
          status: status,
          price: price
        });
      }
    }

    await prisma.eventSeat.createMany({
      data: eventSeatsData
    });

    return NextResponse.json({ 
      success: true, 
      message: "Perfect BookMyShow dummy event created!", 
      eventId: event.id,
      venueId: venue.id,
      seatsGenerated: eventSeatsData.length
    });

  } catch (error) {
    console.error("Seed Error:", error);
    return NextResponse.json({ error: "Failed to seed dummy event", details: String(error) }, { status: 500 });
  }
}
