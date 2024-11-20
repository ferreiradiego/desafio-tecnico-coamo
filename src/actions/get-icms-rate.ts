"use server";

import { prisma } from "@/lib/prisma";
import {
  FinalidadeTributacao,
  GrupoProduto,
  TipoCooperado,
} from "@prisma/client";

interface ICMSRateParams {
  finalidade: FinalidadeTributacao;
  ufOrigem: string;
  ufConsumo: string;
  grupoProduto: GrupoProduto;
  tipoCooperado: TipoCooperado;
}

export const getICMSRate = async ({
  finalidade,
  ufOrigem,
  ufConsumo,
  grupoProduto,
  tipoCooperado,
}: ICMSRateParams) => {
  if (
    !finalidade ||
    !ufOrigem ||
    !ufConsumo ||
    !grupoProduto ||
    !tipoCooperado
  ) {
    throw new Error("Todos os parâmetros são obrigatórios");
  }

  const result = await prisma.tributacao.findFirst({
    where: {
      finalidade,
      uf_origem: ufOrigem,
      uf_consumo: ufConsumo,
      grupo_produto: grupoProduto,
      tipo_cooperado: tipoCooperado,
    },
    select: {
      aliquota_icms: true,
    },
  });

  return Number(result?.aliquota_icms) || 0;
};
