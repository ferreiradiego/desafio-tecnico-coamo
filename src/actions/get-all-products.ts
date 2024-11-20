"use server";

import { prisma } from "@/lib/prisma";

// Seleciona todos os produtos cadastrados no banco de dados
export const getAllProducts = async () => {
  return await prisma.produto.findMany({});
};
