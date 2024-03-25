export type TBudgetItem = {
  id: string;
  os: string;
  description: string;
  qtd: number;
  price: number;
};

export type TNewBudgetItem = Omit<TBudgetItem, 'id'>;
