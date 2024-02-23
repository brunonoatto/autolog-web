import { StatusCarEnum } from '@shared/types/statusCar';
import type { TDashboardItem } from './types';

// const BASE_URL = 'https://autolog-api.com.br/';
const listDashboardMock: TDashboardItem[] = [
  {
    license: 'AAA4323',
    brand: 'Ford',
    model: 'Fiesta 1.6',
    year: 2015,
    status: StatusCarEnum.WaitingBudget,
  },
  {
    license: 'BBB4323',
    brand: 'Volkswagen',
    model: 'Polo',
    year: 2011,
    status: StatusCarEnum.WaitingBudgetApproval,
  },
  {
    license: 'VVV4323',
    brand: 'Fiat',
    model: 'Uno',
    year: 1998,
    status: StatusCarEnum.ApprovedBudget,
  },
  {
    license: 'DDD4323',
    brand: 'Peugeot',
    model: '206',
    year: 2020,
    status: StatusCarEnum.BudgetRejected,
  },
  {
    license: 'DAD4323',
    brand: 'Peugeot',
    model: '206',
    year: 2020,
    status: StatusCarEnum.RunningService,
  },
];

export const listDashboard = async (): Promise<TDashboardItem[]> => {
  //const response = await axios.get<TDashboardItem[]>(`${BASE_URL}/dashboard`);
  //return response.data;

  await new Promise((resolve) => setTimeout(resolve, 2000));
  return listDashboardMock;
};
