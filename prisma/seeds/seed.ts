import { PrismaClient } from "@prisma/client";
import { serviceSeed } from "./services.seed"; // Import correctly

const prisma = new PrismaClient();

async function seed() {
  console.log("Running seed to db" );
  await serviceSeed();
}

seed()