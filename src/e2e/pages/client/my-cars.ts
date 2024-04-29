import type { Locator, Page } from '@playwright/test';

import { expect } from '@e2e/core/fixtures';
import { MY_CARS_CARD_TEST_ID } from '@modules/client/my-cars/consts';
import { CARD_TITLE_TESTE_ID } from '@shared/design-system/ui/consts';

class ClientMyCarsPage {
  page: Page;
  private cardTitleElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cardTitleElement = page.getByTestId(MY_CARS_CARD_TEST_ID).getByTestId(CARD_TITLE_TESTE_ID);
  }

  async expectCardTitle(title: string) {
    await expect(this.cardTitleElement).toHaveText(title);
  }
}

export default ClientMyCarsPage;
