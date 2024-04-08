import type { TBudget, TBudgetCompleteResponse } from '@core/api/budget/types';
import type { TBudgetItem } from '@core/api/budget-item/types';
import type { TCar } from '@core/api/car/types';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

export class BudgetComplete implements TBudget {
  os: string;
  garageId: string;
  license: string;
  status: BudgetStatusEnum;
  clientId: string;
  observation?: string;
  createdDate: string;
  items: TBudgetItem[];
  car: TCar;

  constructor(obj: TBudgetCompleteResponse) {
    this.os = obj.os;
    this.garageId = obj.garageId;
    this.license = obj.license;
    this.status = obj.status;
    this.clientId = obj.clientId;
    this.observation = obj.observation;
    this.createdDate = new Date(obj.createdDate).toLocaleDateString();
    this.items = obj.items;
    this.car = obj.car;
  }
}
