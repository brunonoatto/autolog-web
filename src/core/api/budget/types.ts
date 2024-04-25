import type { TBudgetItem } from '@core/api/budget-item/types';
import type { TCar } from '@core/api/car/types';
import type { BudgetStatusEnum } from '@shared/types/budgetStatus';

export type TNewBudgetParams = {
  license: string;
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
  status: BudgetStatusEnum;
  clientId: string;
  observation?: string;
  createdDate: string;
};

export type TBudgetListItemResponse = {
  os: string;
  garageId: string;
  garageName: string;
  observation: string;
  createdDate: string;
  license: string;
  status: BudgetStatusEnum;
  clientName: string;
  car: Omit<TCar, 'license'>;
};

export type TBudgetCompleteResponse = TBudget & {
  garageName: string;
  car: TCar;
  items: TBudgetItem[];
};

export type TGetWhatsLinkResponse = {
  link: string;
};
