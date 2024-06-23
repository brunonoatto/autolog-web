import type { Locator, Page } from '@playwright/test';

import { TBudgetAddFormType } from '@core/store/context/types/budget-add';
import { expect } from '@e2e/core/fixtures';
import { TMyCarsFillProps } from '@e2e/pages/client/types';
import { fillSelect } from '@e2e/shared/helpers/select';
import { selectorByName } from '@e2e/shared/utils';
import { MY_CARS_CARD_TEST_ID } from '@modules/client/my-cars/consts';
import {
  GARAGE_BUDGET_ADD_FORM_TEST_ID,
  SELECT_CAR_BUDGET_ADD_BUTTON_TESTID,
} from '@modules/garage/budget-add/const';
import { CARD_TITLE_TESTE_ID } from '@shared/design-system/ui/consts';

class GarageBudgetAddPage {
  page: Page;
  private cardTitleElement: Locator;
  private cpfCnpjInput: Locator;
  private nameInput: Locator;
  private phoneInput: Locator;
  private licenseInput: Locator;
  private brandInput: Locator;
  private modelInput: Locator;
  private yearInput: Locator;
  private observationInput: Locator;
  private addCarButton: Locator;
  private form: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cardTitleElement = page.getByTestId(MY_CARS_CARD_TEST_ID).getByTestId(CARD_TITLE_TESTE_ID);

    this.cpfCnpjInput = page.locator(selectorByName<TBudgetAddFormType>('client.cpfCnpj'));
    this.nameInput = page.locator(selectorByName<TBudgetAddFormType>('client.name'));
    this.phoneInput = page.locator(selectorByName<TBudgetAddFormType>('client.phone'));
    this.licenseInput = page.locator(selectorByName<TBudgetAddFormType>('car.license'));
    this.brandInput = page.locator(selectorByName<TBudgetAddFormType>('car.brand'));
    this.modelInput = page.locator(selectorByName<TBudgetAddFormType>('car.model'));
    this.yearInput = page.locator(selectorByName<TBudgetAddFormType>('car.year'));
    this.observationInput = page.locator(selectorByName<TBudgetAddFormType>('observation'));
    this.addCarButton = page.getByTestId(SELECT_CAR_BUDGET_ADD_BUTTON_TESTID);
    this.form = page.getByTestId(GARAGE_BUDGET_ADD_FORM_TEST_ID);
  }

  async fillComplete({
    cpfCnpj,
    name,
    phone,
    license,
    brand,
    model,
    year,
    observation,
  }: TMyCarsFillProps) {
    await this.cpfCnpjInput.fill(cpfCnpj);
    await this.nameInput.fill(name);
    await this.phoneInput.fill(phone);
    await this.addCarButton.click();

    await this.licenseInput.fill(license);
    await fillSelect(this.page, this.brandInput, brand);
    await fillSelect(this.page, this.modelInput, model);
    await this.yearInput.fill(year.toString());

    if (observation) await this.observationInput.fill(observation);

    await this.form.click();
  }

  async expectCardTitle(title: string) {
    await expect(this.cardTitleElement).toHaveText(title);
  }
}

export default GarageBudgetAddPage;
