import type { TBudgetItem } from '@core/api/budget-item/types';
import type { TCar } from '@core/api/car/types';
import type { BudgetStatusEnum } from '@shared/types/budgetStatus';

export type TNewBudgetParams = {
  clientId?: string;
  newClient?: {
    name: string;
    cpfCnpj: string;
    phone: string;
  };
  carId?: string;
  car?: {
    license: string;
    brand: string;
    model: string;
    year: number;
  };
  observation?: string;
};

export type TBudget = {
  id: string;
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

export type TObservationUpdateParams = {
  budgetId: string;
  observation: string;
};
