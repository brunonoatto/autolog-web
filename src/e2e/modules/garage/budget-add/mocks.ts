import { TBudget } from '@core/api/budget/types';
import RouteData from '@e2e/core/fixtures/route/_types/RouteData';
import RoutesData from '@e2e/shared/routes.ts';

const budgetPostResponse: TBudget = {
  id: 'budgetId',
  garageId: '54d77a26-d07a-4010-b0b3-9f5ad8139bbf',
  os: 'e83407aa-f242-415c-82d9-6668e9a70c08',
  status: 1,
  clientId: '60bb47a6-56cd-4147-87a7-0cd95d7d787a',
  license: 'AAA1212',
  observation: 'Texto da Observações do teste.',
  createdDate: '2024-04-29T23:05:18.416Z',
};
export const budgetPostRouteData = new RouteData(
  RoutesData.Budget.budgetPostAppRoute,
  budgetPostResponse,
);
