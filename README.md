# Desafio Técnico - Coamo

## Modelagem do Banco de Dados

[Modelagem do Banco de Dados](https://dbdiagram.io/d/desafio-coamo-673d0a10e9daa85aca07517c)

## Comparação de Exemplos de Cálculo de Venda

### Exemplo 1: Venda à Vista (Conceito B - Pessoa Física)

#### Dados do Exemplo

- **Cooperado**: Fulano de Tal (Conceito **B**, Pessoa Física).
- **Forma de Pagamento**: À Vista.
- **Itens**:
  - Fertilizante 1 (R$ 100, ICMS 12%, grupo Fertilizantes).
  - Corretivo 1 (R$ 50, ICMS 18%, grupo Corretivos).
  - Herbicida 1 (R$ 200, ICMS 12%, grupo Herbicidas).

#### Passo a Passo

| Produto            | Preço Base | Desconto Progressivo (3%) | Desconto Adicional (3%) | Preço com Desconto | Juros | ICMS (%) | ICMS     | Preço Final |
| ------------------ | ---------- | ------------------------- | ----------------------- | ------------------ | ----- | -------- | -------- | ----------- |
| **Fertilizante 1** | R$ 100     | R$ 3.00                   | R$ 3.00                 | R$ 94.00           | R$ 0  | 12%      | R$ 11.28 | R$ 105.28   |
| **Corretivo 1**    | R$ 50      | R$ 1.50                   | R$ 1.50                 | R$ 47.00           | R$ 0  | 18%      | R$ 8.46  | R$ 55.46    |
| **Herbicida 1**    | R$ 200     | R$ 6.00                   | R$ 6.00                 | R$ 188.00          | R$ 0  | 12%      | R$ 22.56 | R$ 210.56   |

| **Total da Venda** | **R$ 371.30** |

---

### Exemplo 2: Venda a Prazo (Conceito A - Pessoa Jurídica)

#### Dados do Exemplo

- **Cooperado**: Empresa X (Conceito **A**, Pessoa Jurídica).
- **Forma de Pagamento**: A Prazo (22 dias úteis).
- **Itens**:
  - Fertilizante 1 (R$ 100, ICMS 12%, grupo Fertilizantes).
  - Corretivo 1 (R$ 50, ICMS 18%, grupo Corretivos).
  - Herbicida 1 (R$ 200, ICMS 12%, grupo Herbicidas).

#### Passo a Passo

| Produto            | Preço Base | Desconto Progressivo (3%) | Desconto Adicional (0%) | Preço com Desconto | Juros (22 dias úteis) | ICMS (%) | ICMS     | Preço Final |
| ------------------ | ---------- | ------------------------- | ----------------------- | ------------------ | --------------------- | -------- | -------- | ----------- |
| **Fertilizante 1** | R$ 100     | R$ 3.00                   | R$ 0.00                 | R$ 97.00           | R$ 1.07               | 12%      | R$ 11.77 | R$ 109.84   |
| **Corretivo 1**    | R$ 50      | R$ 1.50                   | R$ 0.00                 | R$ 48.50           | R$ 0.54               | 18%      | R$ 8.83  | R$ 57.87    |
| **Herbicida 1**    | R$ 200     | R$ 6.00                   | R$ 0.00                 | R$ 194.00          | R$ 2.13               | 12%      | R$ 23.54 | R$ 219.67   |

| **Total da Venda** | **R$ 387.38** |

---

## Passo a Passo para testar

1. **Ajustar o arquivo `.env`**

   Certifique-se de que todas as variáveis de ambiente necessárias estão configuradas corretamente no arquivo `.env` (veja `.env.example`).

2. **Subir o contêiner Docker**

   Execute o comando abaixo para iniciar o contêiner Docker:

   ```bash
   docker compose up -d
   ```

3. **Instalar as dependências**

   Instale as dependências do projeto

   ```bash
   npm install
   ```
4. **Popular o banco de dados com o script de seed**

   Com o contêiner em execução, execute o seed do db para adicionar os dados de teste:

   ```bash
   npx prisma db seed
   ```

5. **Rodar a aplicação**

   Com o contêiner em execução, inicie a aplicação com o comando:

   ```bash
   npm run dev
   ```
