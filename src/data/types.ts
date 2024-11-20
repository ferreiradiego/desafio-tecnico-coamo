import { Cooperado, FormaPagamento, Produto, Unidade } from "@prisma/client";

export type CreateSaleDto = {
  data_venda: Date;
  cooperado: Cooperado;
  unidade: Unidade;
  items: {
    quantidade: number;
    desconto: number;
    icms_aplicado: number;
    produto: Produto;
  }[];
  forma_pagamento: FormaPagamento;
  data_vencimento?: Date;
};
