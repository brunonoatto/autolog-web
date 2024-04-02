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
  clientName: string;
  clientPhone: string;
  clientCpf_cnpj: string;
  car: TCar;
};

export type TGetBudgetResponse = TBudget & {
  car: TCar;
  items: TBudgetItem[];
};

export type TGetWhatsLinkResponse = {
  link: string;
};
