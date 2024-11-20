"use client";

import { CreateSaleDto } from "@/data";
import { Button } from "./ui/button";
import { addSale } from "@/actions/add-sale";

interface SimulateSaleButtonProps {
  sale: CreateSaleDto;
}

const SimulateSaleButton = ({ sale }: SimulateSaleButtonProps) => {
  const handleSimulateSaleClick = async () => {
    try {
      const res = await addSale(sale);
      alert(
        `Venda simulada com sucesso! ID: ${res.venda_id}, Valor: R$ ${res.valor_total}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  return <Button onClick={handleSimulateSaleClick}>Adicionar</Button>;
};

export default SimulateSaleButton;
