const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function clean() { 
  const events = await prisma.event.findMany({where: {title: {contains: 'Coldplay'}}}); 
  for (const ev of events) { 
    // Delete tickets first since they depend on bookings and event seats
    const bookings = await prisma.booking.findMany({where: {eventId: ev.id}});
    for (const b of bookings) {
       await prisma.ticket.deleteMany({where: {bookingId: b.id}});
    }
    await prisma.booking.deleteMany({where: {eventId: ev.id}});
    
    // Now delete seats and zones
    await prisma.eventSeat.deleteMany({where: {eventId: ev.id}}); 
    await prisma.eventZone.deleteMany({where: {eventId: ev.id}}); 
    
    // Finally delete event
    await prisma.event.delete({where: {id: ev.id}}); 
  } 
  console.log('Deleted old Coldplay events successfully'); 
  await prisma.$disconnect(); 
} 
clean();
