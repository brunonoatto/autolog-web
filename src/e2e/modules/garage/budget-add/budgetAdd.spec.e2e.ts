import { test } from '@e2e/core/fixtures';
import { budgetPostAssertData } from '@e2e/modules/garage/budget-add/asserts';
import {
  brandsRouteData,
  budgetPostRouteData,
  modelsMecaRouteData,
} from '@e2e/modules/garage/budget-add/mocks';

test('Deve realizar a inclusão de um orçamento e após ir para tela de add itens', async ({
  applicationSetup,
  assertUtils,
  routesUtils,
  modalComponent,
  garageBudgetAddPage,
}) => {
  await assertUtils.assertRequestPayloadList([budgetPostAssertData]);
  await routesUtils.mockRouteResponseList([
    brandsRouteData,
    modelsMecaRouteData,
    budgetPostRouteData,
  ]);

  await applicationSetup.setupGarage('/garage/orcamento');

  await garageBudgetAddPage.fillComplete({
    cpfCnpj: '310.179.440-40',
    name: 'Cliente sem cadastro',
    phone: '51998855221',
    license: 'AAA1212',
    brand: 'Mercedes-Benz',
    model: 'C-180',
    year: 2010,
    observation: 'Texto da observação do teste.',
  });

  await modalComponent.confirmClick();
});
