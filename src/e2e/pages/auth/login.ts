import type { Locator, Page } from '@playwright/test';

import { inputSelector } from '@e2e/shared/utils';
import { LOGIN_FORM_TEST_ID, TLoginFormType } from '@modules/auth/login/types';

class LoginPage {
  page: Page;
  private emailInput: Locator;
  private passwordInput: Locator;
  private buttonLogin: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator(inputSelector<TLoginFormType>('email'));
    this.passwordInput = page.locator(inputSelector<TLoginFormType>('password'));
    this.buttonLogin = page.getByTestId(LOGIN_FORM_TEST_ID);
  }

  async login(username: string, password: string) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.buttonLogin.click();
  }
}

export default LoginPage;
