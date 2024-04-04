import type { TBudgetListItemResponse } from '@core/api/budget/types';
import type { TCar } from '@core/api/car/types';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

export class BudgetListItem {
  os: string;
  garageId: string;
  createdDate: string;
  license: string;
  status: BudgetStatusEnum;
  clientName: string;
  car: TCar;

  constructor(obj: TBudgetListItemResponse) {
    this.os = obj.os;
    this.garageId = obj.garageId;
    this.createdDate = new Date(obj.createdDate).toLocaleDateString();
    this.license = obj.license;
    this.status = obj.status;
    this.clientName = obj.clientName;
    this.car = { ...obj.car, license: obj.license };
  }
}
