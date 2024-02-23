import type { TDashboardItem } from '@core/api/autolog/types';
import { StatusCarEnum } from '@shared/types/statusCar';
import { getStatusCarDescription } from '@shared/helpers/string';

export class DashboardItem {
  license: string;
  brand: string;
  model: string;
  year: number;
  status: StatusCarEnum;
  statusDescription: string;

  constructor(obj: TDashboardItem) {
    this.license = obj.license;
    this.brand = obj.brand;
    this.model = obj.model;
    this.year = obj.year;
    this.status = obj.status;
    this.statusDescription = getStatusCarDescription(obj.status);
  }
}
