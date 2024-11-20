"use server";

import { prisma } from "@/lib/prisma";

// Seleciona todos os cooperados cadastrados no banco de dados, incluindo os dados de pessoa física e pessoa jurídica
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
