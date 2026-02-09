export type TBudgetItem = {
  id: string;
  budgetId: string;
  description: string;
  qtd: number;
  price: number;
};

export type TFormBudgetItem = Omit<TBudgetItem, 'id'> & { id?: string };
