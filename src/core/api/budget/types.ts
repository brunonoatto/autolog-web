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
  name: string;
  phone: string;
  cpf_cnpj: string;
  observation?: string;
};

export type TGetBudgetResponse = TBudget & {
  car: TCar;
  items: TBudgetItem[];
};
