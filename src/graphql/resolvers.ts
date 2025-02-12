import prisma from "../prisma"; // Import the shared Prisma instance


export const resolvers = {
  Query: {
    leads: async () => {
      return prisma.lead.findMany({
        include: { services: true },
      });
    },
    lead: async (_: any, { name }: { name: string }) => {
      return prisma.lead.findFirst({
        where: { name },
        include: { services: true },
      });
    },
  },
  Mutation: {
    register: async (_: any, { name, email, mobile, postcode, services }: any) => {
      const serviceConnections = services.map((type: string) => ({
        type
      }));
      

      console.log(serviceConnections)

      const lead = await prisma.lead.create({
        data: {
          name,
          email,
          mobile,
          postcode,
          services: {
            connect: serviceConnections
          },
        },
        include: { services: true },
      });

      return lead;
    },
  },
};
