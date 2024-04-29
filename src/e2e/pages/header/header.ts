import type { Locator, Page } from '@playwright/test';

import { expect } from '@e2e/core/fixtures';
import { HEADER_NAME_TEST_ID } from '@layout/body-app/header/header-actions/consts';

class HeaderPage {
  page: Page;
  private nameElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameElement = page.getByTestId(HEADER_NAME_TEST_ID);
  }

  async expectNameToUser(name: string) {
    await expect(this.nameElement).toHaveText(name);
  }
}

export default HeaderPage;
