/*
  Warnings:

  - Added the required column `valor_total` to the `Venda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Venda" ADD COLUMN     "valor_total" DECIMAL(10,2) NOT NULL;
