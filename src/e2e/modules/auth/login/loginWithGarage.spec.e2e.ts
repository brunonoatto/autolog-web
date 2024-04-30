import { test } from '@e2e/core/fixtures';
import { garageAccessTokenData } from '@e2e/mocks/auth/login';
import { loginGarageRouteData } from '@e2e/modules/auth/login/mocks';

test('Deve realizar o login com usuário do tipo Garage', async ({
  applicationSetup,
  routesUtils,
  loginPage,
  headerPage,
  garageDashboardPage,
}) => {
  await routesUtils.mockRouteResponseList([loginGarageRouteData]);

  await applicationSetup.setup('/login');

  await loginPage.login('garage@garage.com.br', 'senha123');

  await headerPage.expectNameToUser(garageAccessTokenData.name);
  await garageDashboardPage.expectCardTitle('Dashboard');
});
