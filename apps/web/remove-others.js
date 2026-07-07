const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const eventsToKeep = [
      "Abhang Sandhya - A Musical Journey",
      "Maharashtra Chi Lokdhara",
      "Shivarajyabhishek - Maha Natak"
    ];

    const eventsToDelete = await prisma.event.findMany({
      where: {
        title: {
          notIn: eventsToKeep
        }
      }
    });

    console.log(`Found ${eventsToDelete.length} events to delete.`);

    for (const ev of eventsToDelete) {
      console.log(`Deleting: ${ev.title}`);
      
      const bookings = await prisma.booking.findMany({ where: { eventId: ev.id } });
      for (const b of bookings) {
        await prisma.ticket.deleteMany({ where: { bookingId: b.id } });
      }
      await prisma.booking.deleteMany({ where: { eventId: ev.id } });
      await prisma.eventSeat.deleteMany({ where: { eventId: ev.id } });
      await prisma.eventZone.deleteMany({ where: { eventId: ev.id } });
      await prisma.event.delete({ where: { id: ev.id } });
    }

    console.log("Cleanup complete!");
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
