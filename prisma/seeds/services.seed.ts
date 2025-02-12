import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function serviceSeed() {
  await prisma.service.createMany({
    data: [
      { type: "DELIVERY" },
      { type: "PICKUP" },
      { type: "PAYMENT" },
    ],
    skipDuplicates: true, // Avoid duplicates
  });

  console.log("Initialize data for services (Delivery, Pickup, Payment)");
}



