import type { Page } from '@playwright/test';

import { TAccessTokenData } from '@core/api/auth/types';
import { TRoute } from '@core/router/consts';
import { clientAccessTokenData, garageAccessTokenData } from '@e2e/core/shared/consts/auth';
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

  async setUserAuth(user: TAccessTokenData) {
    await this.page.addInitScript((user) => {
      localStorage.setItem(StorageKeyEnum.auth, btoa(JSON.stringify(user)));
    }, user);
  }

  async setup(route: TRoute = '', user?: TAccessTokenData) {
    if (route && user) {
      await this.setUserAuth(user);
    }

    await this.abortRoutes();

    await this.page.goto(`http://localhost:4173${route || ''}`);
  }

  async setupGarage(route: TRoute = '') {
    this.setup(route, garageAccessTokenData);
  }

  async setupClient(route: TRoute = '') {
    this.setup(route, clientAccessTokenData);
  }
}

export default ApplicationSetup;
