import httpClient from '@core/api/http-client';

import type { TBudgetItem, TFormBudgetItem } from './types';

const BASE_URL = '/budget-item';

export const addBudgetItem = async ({
  budgetId,
  ...otherFields
}: TFormBudgetItem): Promise<TBudgetItem> => {
  const response = await httpClient.post<TBudgetItem>(`${BASE_URL}/${budgetId}`, otherFields);
  return response.data;
};

export const updateBudgetItem = async ({
  budgetId,
  id: budgetItemId,
  ...otherFields
}: TFormBudgetItem): Promise<TBudgetItem> => {
  const response = await httpClient.put<TBudgetItem>(
    `${BASE_URL}/${budgetId}/${budgetItemId}`,
    otherFields,
  );
  return response.data;
};

export const deleteBudgetItem = async (id: string): Promise<boolean> => {
  const response = await httpClient.delete<boolean>(`${BASE_URL}/${id}`);
  return response.data;
};
