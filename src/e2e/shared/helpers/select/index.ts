import { Locator, Page } from '@playwright/test';

import { COMBOBOX_OPTIONS_TEST_ID } from '@shared/design-system/ui/consts';

export async function fillSelect(page: Page, elementLocator: Locator, searchValue: string) {
  await elementLocator.click();

  // pensar em uma forma que não precise do page ou que seja mais simples
  await page.getByRole('dialog').getByPlaceholder('Procurar item...').fill(searchValue);
  await page.locator(`[data-testid=${COMBOBOX_OPTIONS_TEST_ID}] div div`).nth(0).click();
}
