import prisma from "../prisma"; // Import the shared Prisma instance
import { leadQueries } from "./resolvers/queries/lead";
import { registerMutations } from "./resolvers/mutations/register";

export const resolvers = {
  Query: { ...leadQueries },
  Mutation: { ...registerMutations }
}
