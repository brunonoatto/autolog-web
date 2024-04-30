import type { Locator, Page } from '@playwright/test';

import {
  MODAL_CANCEL_BUTTON_TEST_ID,
  MODAL_CONFIRM_BUTTON_TEST_ID,
} from '@shared/design-system/ui/modal/consts';

class ModalComponent {
  page: Page;
  private confirmButtonElement: Locator;
  private cancelButtonElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmButtonElement = page.getByTestId(MODAL_CONFIRM_BUTTON_TEST_ID);
    this.cancelButtonElement = page.getByTestId(MODAL_CANCEL_BUTTON_TEST_ID);
  }

  async confirmClick() {
    await this.confirmButtonElement.click();
  }

  async cancelClick() {
    await this.cancelButtonElement.click();
  }
}

export default ModalComponent;
