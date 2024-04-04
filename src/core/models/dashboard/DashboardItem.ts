import type { TDashboardItem } from '@core/api/dashboard/types';
import { getStatusCarDescription } from '@shared/helpers/string';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

export class DashboardItem {
  os: string;
  observation?: string;
  status: BudgetStatusEnum;
  statusDescription: string;
  clientName: string;
  license: string;
  brand: string;
  model: string;
  year: number;

  constructor(obj: TDashboardItem) {
    this.os = obj.os;
    this.observation = obj.observation;
    this.status = obj.status;
    this.statusDescription = getStatusCarDescription(obj.status);
    this.clientName = obj.clientName;
    this.license = obj.license;
    this.brand = obj.brand;
    this.model = obj.model;
    this.year = obj.year;
  }
}
