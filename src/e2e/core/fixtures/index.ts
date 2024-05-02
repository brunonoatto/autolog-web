import base from '@playwright/test';

import AssertUtils from '@e2e/core/fixtures/assert';
import contextCoverage from '@e2e/core/fixtures/coverage';
import MenusUtils from '@e2e/core/fixtures/menus';
import ModalComponent from '@e2e/core/fixtures/modal';
import RoutesUtils from '@e2e/core/fixtures/route/index';
import ApplicationSetup from '@e2e/core/fixtures/setup';
import LoginPage from '@e2e/pages/auth/login';
import ClientMyCarsPage from '@e2e/pages/client/my-cars';
import GarageBudgetAddPage from '@e2e/pages/garage/budget-add';
import GarageBudgetViewPage from '@e2e/pages/garage/budget-view';
import GarageDashboardPage from '@e2e/pages/garage/dashboard';
import HeaderPage from '@e2e/pages/header/header';

type TMyFixtures = {
  applicationSetup: ApplicationSetup;
  menusUtils: MenusUtils;
  assertUtils: AssertUtils;
  routesUtils: RoutesUtils;
  // toastComponent: ToastComponent;
  modalComponent: ModalComponent;
  loginPage: LoginPage;
  headerPage: HeaderPage;
  clientMyCarsPage: ClientMyCarsPage;
  garageBudgetAddPage: GarageBudgetAddPage;
  garageBudgetViewPage: GarageBudgetViewPage;
  garageDashboardPage: GarageDashboardPage;
};

export const test = base.extend<TMyFixtures>({
  context: async ({ context }, use) => {
    await contextCoverage(context, use);
  },
  applicationSetup: async ({ page }, use) => {
    await use(new ApplicationSetup(page));
  },
  menusUtils: async ({ page }, use) => {
    await use(new MenusUtils(page));
  },
  assertUtils: async ({ page }, use) => {
    await use(new AssertUtils(page));
  },
  routesUtils: async ({ page }, use) => {
    await use(new RoutesUtils(page));
  },
  // toastComponent: async ({ page }, use) => {
  //   await use(new ToastComponent(page));
  // },
  modalComponent: async ({ page }, use) => {
    await use(new ModalComponent(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  headerPage: async ({ page }, use) => {
    await use(new HeaderPage(page));
  },
  clientMyCarsPage: async ({ page }, use) => {
    await use(new ClientMyCarsPage(page));
  },
  garageBudgetAddPage: async ({ page }, use) => {
    await use(new GarageBudgetAddPage(page));
  },
  garageBudgetViewPage: async ({ page }, use) => {
    await use(new GarageBudgetViewPage(page));
  },
  garageDashboardPage: async ({ page }, use) => {
    await use(new GarageDashboardPage(page));
  },
});

export const expect = test.expect;
