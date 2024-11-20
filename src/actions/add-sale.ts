"use server";

import { CreateSaleDto } from "@/data";
import { calculateTotal } from "@/helpers/sale";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// Adiciona uma nova venda ao banco de dados
export const addSale = async (input: CreateSaleDto) => {
  const data: Prisma.VendaCreateInput = {
    cooperado: { connect: { cooperado_id: input.cooperado.cooperado_id } },
    unidade: { connect: { unidade_id: input.unidade.unidade_id } },
    data_venda: input.data_venda,
    data_vencimento: input.data_vencimento,
    forma_pagamento: input.forma_pagamento,
    items: {
      create: input.items.map((item) => ({
        quantidade: item.quantidade,
        desconto: item.desconto,
        icms_aplicado: item.icms_aplicado,
        produto: { connect: { produto_id: item.produto.produto_id } },
      })),
    },
    valor_total: calculateTotal(input),
  };

  return await prisma.venda.create({ data });
};
