import base from '@playwright/test';

import RoutesUtils from '@e2e/core/fixtures/routes';
import ApplicationSetup from '@e2e/core/fixtures/setup';
import LoginPage from '@e2e/pages/auth/login';
import ClientMyCarsPage from '@e2e/pages/client/my-cars';
import GarageDashboardPage from '@e2e/pages/garage/dashboard';
import HeaderPage from '@e2e/pages/header/header';

type TMyFixtures = {
  applicationSetup: ApplicationSetup;
  routesUtils: RoutesUtils;
  // toastComponent: ToastComponent;
  // modalComponent: ModalComponent;
  loginPage: LoginPage;
  headerPage: HeaderPage;
  clientMyCarsPage: ClientMyCarsPage;
  garageDashboardPage: GarageDashboardPage;
};

export const test = base.extend<TMyFixtures>({
  // context: async ({ context }, use) => {
  //   await contextCoverage(context, use);
  // },
  applicationSetup: async ({ page }, use) => {
    await use(new ApplicationSetup(page));
  },
  routesUtils: async ({ page }, use) => {
    await use(new RoutesUtils(page));
  },
  // toastComponent: async ({ page }, use) => {
  //   await use(new ToastComponent(page));
  // },
  // modalComponent: async ({ page }, use) => {
  //   await use(new ModalComponent(page));
  // },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  headerPage: async ({ page }, use) => {
    await use(new HeaderPage(page));
  },
  clientMyCarsPage: async ({ page }, use) => {
    await use(new ClientMyCarsPage(page));
  },
  garageDashboardPage: async ({ page }, use) => {
    await use(new GarageDashboardPage(page));
  },
});

export const expect = test.expect;
