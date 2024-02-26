export type TDashboardItem = {
  license: string;
  brand: string;
  model: string;
  year: number;
  status: number;
};

export type TDashboardItemToAdd = {
  name: string;
  cpf_cnpj: string;
  phone: string;
  license: string;
  brand: string;
  model: string;
  year: number;
  status: number;
  observation?: string;
};
