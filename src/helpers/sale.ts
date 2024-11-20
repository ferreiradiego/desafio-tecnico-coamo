import { CreateSaleDto } from "@/app/page";
import { ClassificacaoCooperado, FormaPagamento } from "@prisma/client";
import { differenceInBusinessDays } from "date-fns";

const calculateTechnologyDiscountPercentage = (
  items: CreateSaleDto["items"]
) => {
  const distinctGroups = new Set(items.map((item) => item.produto.grupo));
  return Math.min(distinctGroups.size * 0.01, 0.05);
};

const calculateMemberDiscountPercentage = (
  forma_pagamento: FormaPagamento,
  cooperado: CreateSaleDto["cooperado"]
) => {
  if (forma_pagamento === FormaPagamento.Prazo) return 0;

  return cooperado.classificacao === ClassificacaoCooperado.A
    ? 0.05
    : cooperado.classificacao === ClassificacaoCooperado.B
    ? 0.03
    : 0;
};

const calculateInterest = (value: number, days: number) => {
  const interestRate = 0.05;
  return value * ((1 + interestRate / 100) ** days - 1);
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

    // Desconto adicional do cooperado baseado na sua classificação (A, B, C) em (%)
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

    // Valor total do item com juros e ICMS
    const totalItem = amountWithInterest + icms;

    total += totalItem;

    // console.log({
    //   nome_comercial: item.produto.nome_comercial,
    //   preco_base: baseAmount,
    //   desconto_progressivo: tecnhologyDiscount,
    //   desconto_adicional: memberDiscount,
    //   preco_com_desconto: amountWithDiscounts,
    //   juros: interest,
    //   icms: icms,
    //   preco_final: totalItem,
    // });
  });

  return total;
};

export {
  calculateTechnologyDiscountPercentage,
  calculateMemberDiscountPercentage,
  calculateInterest,
  calculateTotal,
};
