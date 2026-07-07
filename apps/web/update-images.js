const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateImages() {
  try {
    const events = await prisma.event.findMany();
    
    for (const event of events) {
      let imageUrl = "";
      if (event.title.includes("Abhang")) {
        imageUrl = "/events/abhang.png";
      } else if (event.title.includes("Lokdhara")) {
        imageUrl = "/events/lokdhara.png";
      } else if (event.title.includes("Shivarajyabhishek")) {
        imageUrl = "/events/natak.png";
      }

      if (imageUrl) {
        await prisma.event.update({
          where: { id: event.id },
          data: { imageUrl }
        });
        console.log(`Updated ${event.title} with image: ${imageUrl}`);
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

updateImages();
