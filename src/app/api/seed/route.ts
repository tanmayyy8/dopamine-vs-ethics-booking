import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Create a Grid Venue
    const gridVenue = await prisma.venue.create({
      data: {
        name: "Madison Square Garden",
        type: "SEAT_MAP",
        address: "New York, NY",
        sections: {
          create: [
            {
              name: "VIP Block A",
              seats: {
                create: Array.from({ length: 20 }).map((_, i) => ({
                  row: "A",
                  column: i + 1,
                  label: `A-${i + 1}`
                }))
              }
            }
          ]
        }
      }
    });

    // 2. Create a Zone Venue
    const zoneVenue = await prisma.venue.create({
      data: {
        name: "Central Park Open Air",
        type: "ZONE_BASED",
        address: "New York, NY",
        sections: {
          create: [
            { name: "Gold Pit", capacity: 500 },
            { name: "General Admission", capacity: 2000 }
          ]
        }
      }
    });

    // 3. Create Events
    await prisma.event.createMany({
      data: [
        { title: "Global Tech Summit 2026", date: new Date("2026-08-15"), category: "Corporate", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070", venueId: gridVenue.id },
        { title: "Divine Echoes Concert", date: new Date("2026-09-22"), category: "Concert", imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070", venueId: zoneVenue.id },
        { title: "Luxury Fashion Week", date: new Date("2026-10-10"), category: "Premium Event", imageUrl: "https://images.unsplash.com/photo-1515562141207-7a8efbc05127?q=80&w=2070", venueId: gridVenue.id },
        { title: "Founders Retreat Gala", date: new Date("2026-11-05"), category: "Corporate", imageUrl: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2074", venueId: zoneVenue.id }
      ]
    });

    return NextResponse.json({ success: true, message: "Database seeded!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to seed DB" }, { status: 500 });
  }
}
