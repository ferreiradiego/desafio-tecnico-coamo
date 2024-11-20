import { getAllBranches } from "@/actions/get-all-branches";
import { getAllMembers } from "@/actions/get-all-members";
import { getAllProducts } from "@/actions/get-all-products";
import { getICMSRate } from "@/actions/get-icms-rate";
import SimulateSaleButton from "@/components/simulate-sale-button";
import {
  Produto,
  Cooperado,
  Unidade,
  FormaPagamento,
  FinalidadeTributacao,
  GrupoProduto,
  TipoCooperado,
} from "@prisma/client";

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

const HomePage = async () => {
  const branches = await getAllBranches();
  const products = await getAllProducts();
  const members = await getAllMembers();

  if (!branches || !products || !members) {
    return <div>Carregando...</div>;
  }

  const paramsICMS = {
    finalidade: FinalidadeTributacao.Revenda,
    ufOrigem: "PR",
    ufConsumo: "PR",
    grupoProduto: GrupoProduto.Fertilizantes,
    tipoCooperado: TipoCooperado.PJ,
  };

  // Exemplo de uso da função getICMSRate para obter a alíquota de ICMS de acordo com os parâmetros
  const icmsRate = await getICMSRate(paramsICMS);

  const saleDataPF: CreateSaleDto = {
    data_venda: new Date(),
    cooperado: members[1],
    unidade: branches[0],
    items: products.map((product) => ({
      quantidade: 1,
      desconto: 0,
      icms_aplicado: product.produto_id % 2 === 0 ? 0.18 : 0.12,
      produto: product,
    })),
    forma_pagamento: FormaPagamento.Vista,
  };

  const saleDataPJ: CreateSaleDto = {
    data_venda: new Date(),
    cooperado: members[0],
    unidade: branches[0],
    items: products.map((product) => ({
      quantidade: 1,
      desconto: 0,
      icms_aplicado: product.produto_id % 2 === 0 ? 0.18 : 0.12,
      produto: product,
    })),
    forma_pagamento: FormaPagamento.Prazo,
    data_vencimento: new Date(new Date().setDate(new Date().getDate() + 30)), // 30 dias a partir de hoje
  };

  return (
    <main>
      <div className="p-2 grid grid-cols-2 gap-2">
        <section className="bg-green-50 space-y-2">
          <h2 className="text-2xl font-bold">
            Dados: pessoa física, venda a vista
          </h2>
          <SimulateSaleButton sale={saleDataPF} />
          <pre>{JSON.stringify(saleDataPF, null, 2)}</pre>
        </section>

        <section className="bg-red-50 space-y-2">
          <h2 className="text-2xl font-bold">
            Dados: pessoa jurídica, venda a prazo
          </h2>
          <SimulateSaleButton sale={saleDataPJ} />
          <pre>{JSON.stringify(saleDataPJ, null, 2)}</pre>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
