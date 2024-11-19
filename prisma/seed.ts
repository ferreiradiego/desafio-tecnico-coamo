import {
  Classificacao,
  GrupoProduto,
  PrismaClient,
  TipoCooperado,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const unidade = await prisma.unidade.create({
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
      classificacao: Classificacao.A,
      CooperadoPessoaJuridica: {
        create: {
          data_fundacao: new Date("2000-01-01"),
        },
      },
    },
  });

  // Socio for Cooperado PJ
  const socio = await prisma.socio.create({
    data: {
      cooperado_juridico_id: cooperadoPJ.cooperado_id,
      nome: "Socio 1",
      nacionalidade: "Brasileiro",
    },
  });

  console.log(
    `${cooperadoPJ.nome} has been created with id ${cooperadoPJ.cooperado_id}.`
  );
  console.log(`${socio.nome} has been created with id ${socio.socio_id}.`);

  // Cooperado PF
  const cooperadoPF = await prisma.cooperado.create({
    data: {
      nome: "Pessoa Fisica Y",
      tipo: TipoCooperado.PF,
      classificacao: Classificacao.B,
      CooperadoPessoaFisica: {
        create: {
          cpf: "12345678901",
          rg: "MG1234567",
          estado_civil: "Solteiro",
          data_nascimento: new Date("1990-01-01"),
        },
      },
    },
  });

  console.log(
    `${cooperadoPF.nome} has been created with id ${cooperadoPF.cooperado_id}.`
  );

  const produto = await prisma.produto.create({
    data: {
      nome_comercial: "Produto 1",
      formula: "Formula 1",
      unidade_medida: "kg",
      grupo: GrupoProduto.Fertilizantes,
    },
  });

  const venda = await prisma.venda.create({
    data: {
      cooperado_id: cooperadoPJ.cooperado_id,
      unidade_id: unidade.unidade_id,
      data_venda: new Date(),
    },
  });

  const itemVenda = await prisma.itemVenda.create({
    data: {
      venda_id: venda.venda_id,
      produto_id: produto.produto_id,
      quantidade: 10,
      preco_unitario: 100.0,
      desconto: 5.0,
      icms_aplicado: 18.0,
    },
  });

  console.log(
    `${itemVenda.produto_id} has been created with id ${itemVenda.item_id}.`
  );

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
