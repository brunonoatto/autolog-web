import type { Locator, Page } from '@playwright/test';

import { expect } from '@e2e/core/fixtures';
import { DASHBOARD_CARD_TEST_ID } from '@modules/garage/dashboard/consts';
import { CARD_TITLE_TESTE_ID } from '@shared/design-system/ui/consts';

class GarageDashboardPage {
  page: Page;
  private bodyTitleElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bodyTitleElement = page
      .getByTestId(DASHBOARD_CARD_TEST_ID)
      .getByTestId(CARD_TITLE_TESTE_ID);
  }

  async expectBodyTitle(title: string) {
    await expect(this.bodyTitleElement).toHaveText(title);
  }
}

export default GarageDashboardPage;
