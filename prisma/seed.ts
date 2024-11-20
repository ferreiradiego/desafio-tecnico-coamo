import {
  ClassificacaoCooperado,
  FinalidadeTributacao,
  GrupoProduto,
  PrismaClient,
  TipoCooperado,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.unidade.create({
    data: {
      nome: "Unidade X",
      municipio: "Toledo",
    },
  });

  // Cooperado PJ
  const cooperadoPJ = await prisma.cooperado.create({
    data: {
      nome: "Empresa X",
      tipo: TipoCooperado.PJ,
      classificacao: ClassificacaoCooperado.A,
      cooperado_pj: {
        create: {
          data_fundacao: new Date("2000-01-01"),
        },
      },
    },
  });

  // Socio for Cooperado PJ
  await prisma.socio.create({
    data: {
      cooperado_pj_id: cooperadoPJ.cooperado_id,
      nome: "Socio 1",
      nacionalidade: "Brasileiro",
    },
  });

  await prisma.socio.create({
    data: {
      cooperado_pj_id: cooperadoPJ.cooperado_id,
      nome: "Socio 2",
      nacionalidade: "Argentino",
    },
  });

  // Cooperado PF
  await prisma.cooperado.create({
    data: {
      nome: "Fulano de Tal",
      tipo: TipoCooperado.PF,
      classificacao: ClassificacaoCooperado.B,
      cooperado_pf: {
        create: {
          cpf: "242993242",
          rg: "242993242",
          estado_civil: "Solteiro",
          data_nascimento: new Date("1990-01-01"),
        },
      },
    },
  });

  // Produtos
  await prisma.produto.createMany({
    data: [
      {
        nome_comercial: "Fertilizante 1",
        formula: "NPK 10-10-10",
        unidade_medida: "kg",
        preco_unitario: 100,
        grupo: GrupoProduto.Fertilizantes,
      },
      {
        nome_comercial: "Corretivo 1",
        formula: "CaCO3",
        unidade_medida: "kg",
        preco_unitario: 50,
        grupo: GrupoProduto.Corretivos,
      },
      {
        nome_comercial: "Herbicida 1",
        formula: "Herbicida 1",
        unidade_medida: "kg",
        preco_unitario: 200,
        grupo: GrupoProduto.Herbicidas,
      },
    ],
  });

  // Tributação
  await prisma.tributacao.createMany({
    data: [
      {
        finalidade: FinalidadeTributacao.Revenda,
        uf_origem: "PR",
        uf_consumo: "PR",
        grupo_produto: GrupoProduto.Fertilizantes,
        tipo_cooperado: TipoCooperado.PJ,
        aliquota_icms: 0.12,
      },
      {
        finalidade: FinalidadeTributacao.Revenda,
        uf_origem: "PR",
        uf_consumo: "PR",
        grupo_produto: GrupoProduto.Corretivos,
        tipo_cooperado: TipoCooperado.PJ,
        aliquota_icms: 0.18,
      },
    ],
  });

  console.log("Database has been seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
