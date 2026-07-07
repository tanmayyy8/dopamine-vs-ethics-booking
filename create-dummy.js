process.env.DATABASE_URL = "mysql://root:@localhost:3306/dopaminevsethics";
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Cleaning up old dummy events...");
    // Optional: Delete old events to keep it clean (commented out to be safe)
    // await prisma.event.deleteMany({});
    
    console.log("Generating realistic theater layout (A-Z rows)...");
    
    // 1. Create the Venue
    const venue = await prisma.venue.create({
      data: {
        name: "Balgandharva Rangamandir",
        type: "SEAT_MAP",
        address: "Pune, Maharashtra",
      }
    });

    console.log(`Created Venue: ${venue.name}`);

    // Create realistic sections with A-J rows and varying cols to simulate curves/aisles
    // Platinum: Rows A-D (15 cols)
    const platSeats = [];
    for (let r = 0; r < 4; r++) {
      const rowChar = String.fromCharCode(65 + r); // A, B, C, D
      for (let c = 1; c <= 15; c++) {
        if (c === 6 || c === 11) continue; 
        platSeats.push({ row: rowChar, column: c, label: `${rowChar}-${c}` });
      }
    }
    const platSection = await prisma.section.create({
      data: { venueId: venue.id, name: "VIP (Front)", seats: { create: platSeats } }
    });

    // Gold: Rows E-J (18 cols)
    const goldSeats = [];
    for (let r = 4; r < 10; r++) {
      const rowChar = String.fromCharCode(65 + r); // E, F, G, H, I, J
      for (let c = 1; c <= 18; c++) {
        if (c === 6 || c === 13) continue;
        goldSeats.push({ row: rowChar, column: c, label: `${rowChar}-${c}` });
      }
    }
    const goldSection = await prisma.section.create({
      data: { venueId: venue.id, name: "Premium (Middle)", seats: { create: goldSeats } }
    });

    // Silver: Rows K-O (20 cols)
    const silverSeats = [];
    for (let r = 10; r < 15; r++) {
      const rowChar = String.fromCharCode(65 + r); // K, L, M, N, O
      for (let c = 1; c <= 20; c++) {
        if (c === 6 || c === 15) continue;
        silverSeats.push({ row: rowChar, column: c, label: `${rowChar}-${c}` });
      }
    }
    const silverSection = await prisma.section.create({
      data: { venueId: venue.id, name: "General (Back)", seats: { create: silverSeats } }
    });

    const sections = await prisma.section.findMany({
      where: { venueId: venue.id },
      include: { seats: true }
    });

    // 2. Create Marathi Events
    const eventsData = [
      {
        title: "Abhang Sandhya - A Musical Journey",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        category: "Bhajan & Devotional",
        imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974",
      },
      {
        title: "Maharashtra Chi Lokdhara",
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        category: "Folk Dance & Music",
        imageUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2070",
      },
      {
        title: "Shivarajyabhishek - Maha Natak",
        date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        category: "Akhyan & Historical Drama",
        imageUrl: "https://images.unsplash.com/photo-1521337581100-8ca9a73a5f79?q=80&w=2064",
      }
    ];

    for (const edata of eventsData) {
      const event = await prisma.event.create({
        data: {
          ...edata,
          venueId: venue.id
        }
      });

      console.log(`Generating seats for ${event.title}...`);
      const eventSeatsData = [];
      for (const section of sections) {
        const price = section.name.includes("VIP") ? 1500 : 
                      section.name.includes("Premium") ? 800 : 350;
        
        for (const seat of section.seats) {
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

      await prisma.eventSeat.createMany({ data: eventSeatsData });
      console.log(`Successfully created Event: ${event.title}`);
    }
    
    // Optionally delete the Coldplay event
    await prisma.event.deleteMany({
      where: { title: { contains: "Coldplay" } }
    });
    console.log("Cleaned up old Coldplay dummy events.");

  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
