import {
  INTEREST_RATE,
  MEMBER_DISCOUNTS,
  TECHNOLOGY_DISCOUNT_MAX,
} from "@/constants";
import { CreateSaleDto } from "@/data";
import { ConceitoCooperado, FormaPagamento } from "@prisma/client";
import { differenceInBusinessDays } from "date-fns";

const calculateTechnologyDiscountPercentage = (
  items: CreateSaleDto["items"]
) => {
  const distinctGroups = new Set(items.map((item) => item.produto.grupo));
  return Math.min(distinctGroups.size * 0.01, TECHNOLOGY_DISCOUNT_MAX);
};

const calculateMemberDiscountPercentage = (
  forma_pagamento: FormaPagamento,
  cooperado: CreateSaleDto["cooperado"]
) => {
  if (forma_pagamento === FormaPagamento.Prazo) return 0;

  return cooperado.conceito === ConceitoCooperado.A
    ? MEMBER_DISCOUNTS.A
    : cooperado.conceito === ConceitoCooperado.B
    ? MEMBER_DISCOUNTS.B
    : MEMBER_DISCOUNTS.C;
};

const calculateInterest = (value: number, days: number) => {
  return value * ((1 + INTEREST_RATE / 100) ** days - 1);
};

const calculateTotal = (sale: CreateSaleDto) => {
  const { items, cooperado, forma_pagamento } = sale;

  // Calcula o desconto de tecnologia baseado no número de grupos de produtos distintos (1% por grupo, máximo 5%)
  const tecnhologyDiscountPercentage =
    calculateTechnologyDiscountPercentage(items);

  let total = 0;
  items.forEach((item) => {
    // Valor base do item (quantidade * preço unitário)
    const baseAmount = item.quantidade * Number(item.produto.preco_unitario);

    // Desconto adicional do cooperado baseado no seu conceito (A, B, C) em (%)
    const memberDiscountPercentage = calculateMemberDiscountPercentage(
      forma_pagamento,
      cooperado
    );

    // Desconto total = desconto de use de tecnologia + desconto do cooperado
    const totalDiscount =
      tecnhologyDiscountPercentage + memberDiscountPercentage;
    // Valor do item com descontos
    const amountWithDiscounts = baseAmount * (1 - totalDiscount);

    // Juros (0.05% por dia, calculado a partir da data de venda até a data de vencimento em dias úteis)
    const interest =
      forma_pagamento === FormaPagamento.Prazo && sale.data_vencimento
        ? calculateInterest(
            amountWithDiscounts,
            differenceInBusinessDays(
              sale.data_vencimento ?? sale.data_venda,
              sale.data_venda
            )
          )
        : 0;

    // Valor total do item com juros
    const amountWithInterest = amountWithDiscounts + interest;

    // ICMS (18% para produtos com id par, 12% para produtos com id ímpar)
    // TODO: Para simplificar, estou usando o id do produto como critério para definir o ICMS
    const icms = item.icms_aplicado * amountWithInterest;

    // Lógica de bloqueio de venda caso o ICMS não seja calculado corretamente
    if (icms === null || icms === undefined || isNaN(icms)) {
      throw new Error(
        `Erro no cálculo do ICMS para o produto ${item.produto.nome_comercial}. Operação bloqueada.`
      );
    }

    // Valor total do item com juros e ICMS
    const totalItem = amountWithInterest + icms;

    total += totalItem;
  });

  return total;
};

export {
  calculateTechnologyDiscountPercentage,
  calculateMemberDiscountPercentage,
  calculateInterest,
  calculateTotal,
};
