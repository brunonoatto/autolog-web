import { test } from '@e2e/core/fixtures';
import { loginClientRouteData } from '@e2e/modules/auth/login/mocks';

test('Deve realizar o login com usuário do tipo Client', async ({
  applicationSetup,
  routesUtils,
  loginPage,
  headerPage,
  clientMyCarsPage,
}) => {
  await routesUtils.mockRouteResponseList([loginClientRouteData]);

  await applicationSetup.setup('/login');

  await loginPage.login('client@client.com.br', 'senha123');

  await headerPage.expectNameToUser('clientAccessTokenData.name');
  await clientMyCarsPage.expectCardTitle('Meus Veículos');
});
