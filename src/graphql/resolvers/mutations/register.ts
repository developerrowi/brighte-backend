import prisma from "../../../prisma";

export const registerMutations = {

    register: async (_: any, { name, email, mobile, postcode, services }: any) => {
        const serviceConnections = services.map((type: string) => ({ type }));
      
        const lead = await prisma.lead.create({
          data: {
            name,
            email,
            mobile,
            postcode,
            services: {
              connect: serviceConnections,
            },
          },
          include: { services: true },
        });
      
        return lead;
    }
}
