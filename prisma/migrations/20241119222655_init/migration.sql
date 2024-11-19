-- CreateEnum
CREATE TYPE "Classificacao" AS ENUM ('A', 'B', 'C');

-- CreateEnum
CREATE TYPE "TipoCooperado" AS ENUM ('Fisica', 'Juridica');

-- CreateEnum
CREATE TYPE "GrupoProduto" AS ENUM ('Fertilizantes', 'Corretivos', 'Herbicidas', 'Fungicidas', 'Inseticidas');

-- CreateTable
CREATE TABLE "Unidade" (
    "unidade_id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,

    CONSTRAINT "Unidade_pkey" PRIMARY KEY ("unidade_id")
);

-- CreateTable
CREATE TABLE "Cooperado" (
    "cooperado_id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "classificacao" "Classificacao" NOT NULL,
    "tipo" "TipoCooperado" NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "estado_civil" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "data_fundacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cooperado_pkey" PRIMARY KEY ("cooperado_id")
);

-- CreateTable
CREATE TABLE "Socio" (
    "socio_id" SERIAL NOT NULL,
    "cooperado_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "nacionalidade" TEXT NOT NULL,

    CONSTRAINT "Socio_pkey" PRIMARY KEY ("socio_id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "produto_id" SERIAL NOT NULL,
    "nome_comercial" TEXT NOT NULL,
    "formula" TEXT NOT NULL,
    "unidade_medida" TEXT NOT NULL,
    "grupo" "GrupoProduto" NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("produto_id")
);

-- CreateTable
CREATE TABLE "Venda" (
    "venda_id" SERIAL NOT NULL,
    "cooperado_id" INTEGER NOT NULL,
    "unidade_id" INTEGER NOT NULL,
    "data_venda" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("venda_id")
);

-- CreateTable
CREATE TABLE "ItemVenda" (
    "item_id" SERIAL NOT NULL,
    "venda_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" DOUBLE PRECISION NOT NULL,
    "desconto" DOUBLE PRECISION NOT NULL,
    "icms_aplicado" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ItemVenda_pkey" PRIMARY KEY ("item_id")
);

-- AddForeignKey
ALTER TABLE "Socio" ADD CONSTRAINT "Socio_cooperado_id_fkey" FOREIGN KEY ("cooperado_id") REFERENCES "Cooperado"("cooperado_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_cooperado_id_fkey" FOREIGN KEY ("cooperado_id") REFERENCES "Cooperado"("cooperado_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_unidade_id_fkey" FOREIGN KEY ("unidade_id") REFERENCES "Unidade"("unidade_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemVenda" ADD CONSTRAINT "ItemVenda_venda_id_fkey" FOREIGN KEY ("venda_id") REFERENCES "Venda"("venda_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemVenda" ADD CONSTRAINT "ItemVenda_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto"("produto_id") ON DELETE RESTRICT ON UPDATE CASCADE;
