"use server";

import { prisma } from "@/lib/prisma";

export const getAllMembers = async () => {
  return await prisma.cooperado.findMany({
    include: {
      cooperado_pf: true,
      cooperado_pj: {
        include: {
          socios: true,
        },
      },
    },
  });
};
