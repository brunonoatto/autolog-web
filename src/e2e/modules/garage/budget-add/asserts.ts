import { TNewBudgetParams } from '@core/api/budget/types';
import RouteData from '@e2e/core/fixtures/route/_types/RouteData';
import RoutesData from '@e2e/shared/routes.ts';

const budgetPostRequestAssert: TNewBudgetParams = {
  newClient: {
    name: 'Cliente sem cadastro',
    cpfCnpj: '31017944040',
    phone: '(51) 99885-5221',
  },
  car: {
    license: 'AAA1212',
    brand: 'Mercedes-Benz',
    model: 'C-180 1.6 Turbo 16V/Flex 16V Aut.',
    year: 2010,
  },
  observation: 'Texto da Observações do teste.',
};
export const budgetPostAssertData = new RouteData(
  RoutesData.Budget.budgetPostAppRoute,
  budgetPostRequestAssert,
);
