export type TAddBudgetParams = {
  garageId: string;
  license: string;
  status: number;
  name: string;
  phone: string;
  cpf_cnpj: string;
  observation?: string;
  brand?: string;
  model?: string;
  year?: number;
};

export type TBudget = {
  os: string;
  garageId: string;
  license: string;
  status: number;
  name: string;
  phone: string;
  cpf_cnpj: string;
  observation?: string;
};
