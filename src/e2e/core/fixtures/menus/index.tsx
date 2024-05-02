import type { Page } from '@playwright/test';

import type { TRoute } from '@core/router/consts';
import { BODY_MENU_TEST_ID } from '@layout/body-app/main/menu/consts';

class MenusUtils {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async bodyMenuClick(routeMenu: TRoute) {
    await this.page.getByTestId(`${BODY_MENU_TEST_ID}-${routeMenu}`).click();
  }
}

export default MenusUtils;
