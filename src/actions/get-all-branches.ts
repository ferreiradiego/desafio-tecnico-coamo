"use server";

import { prisma } from "@/lib/prisma";

// Seleciona todas as unidades cadastradas no banco de dados
export const getAllBranches = async () => {
  return await prisma.unidade.findMany({});
};
