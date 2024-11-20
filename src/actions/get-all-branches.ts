"use server";

import { prisma } from "@/lib/prisma";

export const getAllBranches = async () => {
  return await prisma.unidade.findMany({});
};
