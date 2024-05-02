import type { Page } from '@playwright/test';

import { TRoute } from '@core/router/consts';
import { clientAccessToken, garageAccessToken } from '@e2e/mocks/auth/login';
import { StorageKeyEnum } from '@shared/types/storageKey';

class ApplicationSetup {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private async abortRoutes() {
    // await this.page.route('**/*.{png,jpg,jpeg,svg}', (route) => route.abort());
    // await this.page.route('**/node_modules/.vite/deps/chunk-**', (route) => route.abort());
  }

  async setUserAuth(accessToken: string) {
    const args = {
      accessTokenKey: StorageKeyEnum.auth,
      accessToken,
    };

    await this.page.addInitScript(({ accessTokenKey, accessToken }) => {
      localStorage.setItem(accessTokenKey, accessToken);
    }, args);
  }

  async setup(route: TRoute = '', accessToken?: string) {
    if (route && accessToken) {
      await this.setUserAuth(accessToken);
    }

    await this.abortRoutes();

    await this.page.goto(`http://localhost:5173${route || ''}`);
  }

  async setupGarage(route: TRoute = '') {
    await this.setup(route, garageAccessToken);
  }

  async setupClient(route: TRoute = '') {
    await this.setup(route, clientAccessToken);
  }
}

export default ApplicationSetup;
