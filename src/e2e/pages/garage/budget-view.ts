import type { Locator, Page } from '@playwright/test';

import { expect } from '@e2e/core/fixtures';
import { GARAGE_BUDGET_VIEW_CARD_TEST_ID } from '@modules/garage/budget-view/consts';
import { CARD_TITLE_TESTE_ID } from '@shared/design-system/ui/consts';

class GarageBudgetViewPage {
  page: Page;
  private cardTitleElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cardTitleElement = page
      .getByTestId(GARAGE_BUDGET_VIEW_CARD_TEST_ID)
      .getByTestId(CARD_TITLE_TESTE_ID);
  }

  async expectCardTitle(title: string) {
    await expect(this.cardTitleElement).toHaveText(title);
  }
}

export default GarageBudgetViewPage;
