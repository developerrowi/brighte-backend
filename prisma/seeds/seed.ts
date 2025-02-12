import { serviceSeed } from "./services.seed"; // Import correctly

async function seed() {
  console.log("Running seed to db" );
  await serviceSeed();

}

seed()