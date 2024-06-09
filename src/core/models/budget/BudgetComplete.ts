import type { TBudget, TBudgetCompleteResponse } from '@core/api/budget/types';
import type { TBudgetItem } from '@core/api/budget-item/types';
import type { TCar } from '@core/api/car/types';
import type { TQueryClientData } from '@core/service/types';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

export class BudgetComplete implements TBudget {
  id: string;
  os: string;
  garageId: string;
  garageName: string;
  license: string;
  status: BudgetStatusEnum;
  clientId: string;
  observation?: string;
  createdDate: string;
  items: TQueryClientData<TBudgetItem>[];
  car: TCar;

  constructor(obj: TBudgetCompleteResponse) {
    this.id = obj.id;
    this.os = obj.os;
    this.garageId = obj.garageId;
    this.garageName = obj.garageName;
    this.license = obj.license;
    this.status = obj.status;
    this.clientId = obj.clientId;
    this.observation = obj.observation;
    this.createdDate = new Date(obj.createdDate).toLocaleDateString();
    this.items = obj.items;
    this.car = obj.car;
  }
}
