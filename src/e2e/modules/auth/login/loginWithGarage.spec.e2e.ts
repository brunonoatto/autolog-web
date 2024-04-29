import { test } from '@e2e/core/fixtures';
import { garageAccessTokenData } from '@e2e/core/shared/consts/auth';
import { logingarageSuccessRouteData } from '@e2e/modules/auth/login/mocks';

test('Deve realizar o login com usuário do tipo Garage', async ({
  applicationSetup,
  routesUtils,
  loginPage,
  headerPage,
  garageDashboardPage,
}) => {
  await routesUtils.mockRouteResponseList([logingarageSuccessRouteData]);

  await applicationSetup.setup('/login');

  await loginPage.login('garage@garage.com.br', 'senha123');

  await headerPage.expectNameToUser(garageAccessTokenData.name);
  await garageDashboardPage.expectBodyTitle('Dashboard');
});
