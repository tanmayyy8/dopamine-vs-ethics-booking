import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { title, date, category, imageUrl, venueId } = await req.json();

    if (!title || !date || !category || !venueId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Create the Event
    const event = await prisma.event.create({
      data: {
        title,
        date: new Date(date),
        category,
        imageUrl,
        venueId
      }
    });

    // 2. Fetch the Venue and its layout to generate tickets
    const venue = await prisma.venue.findUnique({
      where: { id: venueId },
      include: {
        sections: {
          include: {
            seats: true
          }
        }
      }
    });

    if (venue) {
      if (venue.type === "SEAT_MAP") {
        // Generate EventSeats for every seat in the venue
        const eventSeatsData: any[] = [];
        
        for (const section of venue.sections) {
          // You might have a logic to determine price by section, defaulting to 1000 here
          const price = section.name.toLowerCase().includes('vip') ? 5000 : 
                        section.name.toLowerCase().includes('gold') ? 3000 : 1000;
                        
          for (const seat of section.seats) {
            eventSeatsData.push({
              eventId: event.id,
              seatId: seat.id,
              status: "AVAILABLE",
              price: price
            });
          }
        }

        if (eventSeatsData.length > 0) {
          await prisma.eventSeat.createMany({
            data: eventSeatsData
          });
        }
      } else if (venue.type === "ZONE_BASED") {
        // Generate EventZones for every section
        const eventZonesData = venue.sections.map(section => {
           const price = section.name.toLowerCase().includes('vip') ? 5000 : 
                         section.name.toLowerCase().includes('gold') ? 3000 : 1000;
           return {
             eventId: event.id,
             sectionId: section.id,
             price: price,
             capacity: section.capacity || 100,
             ticketsSold: 0
           };
        });

        if (eventZonesData.length > 0) {
          await prisma.eventZone.createMany({
             data: eventZonesData
          });
        }
      }
    }

    return NextResponse.json({ success: true, eventId: event.id });
  } catch (error) {
    console.error("Create Event Error:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
