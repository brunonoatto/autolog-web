import type { TDashboardItem } from '@core/api/dashboard/types';
import { getStatusCarDescription } from '@shared/helpers/string';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

export class DashboardItem {
  os: string;
  clientName: string;
  license: string;
  brand: string;
  model: string;
  year: number;
  status: BudgetStatusEnum;
  statusDescription: string;

  constructor(obj: TDashboardItem) {
    this.os = obj.os;
    this.clientName = obj.clientName;
    this.license = obj.license;
    this.brand = obj.brand;
    this.model = obj.model;
    this.year = obj.year;
    this.status = obj.status;
    this.statusDescription = getStatusCarDescription(obj.status);
  }
}
