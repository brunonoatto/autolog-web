import type { Locator, Page } from '@playwright/test';

import { selectorByName } from '@e2e/shared/utils';
import { LOGIN_FORM_TEST_ID } from '@modules/auth/login/const';
import { TLoginFormType } from '@modules/auth/login/types';

class LoginPage {
  page: Page;
  private emailInput: Locator;
  private passwordInput: Locator;
  private form: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator(selectorByName<TLoginFormType>('email'));
    this.passwordInput = page.locator(selectorByName<TLoginFormType>('password'));
    this.form = page.getByTestId(LOGIN_FORM_TEST_ID);
  }

  async login(username: string, password: string) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);

    await this.form.click();
  }
}

export default LoginPage;
