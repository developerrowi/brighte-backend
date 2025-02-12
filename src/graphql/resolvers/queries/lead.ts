import prisma from "../../../prisma"; // Adjust the path if needed

export const leadQueries = {
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
};
