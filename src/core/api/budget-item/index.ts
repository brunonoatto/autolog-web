import httpClient from '@core/api/http-client';

import type { TBudgetItem, TNewBudgetItem } from './types';

const BASE_URL = '/budget-item';

export const addBudgetItem = async ({
  os,
  ...otherFields
}: TNewBudgetItem): Promise<TBudgetItem> => {
  const response = await httpClient.post<TBudgetItem>(`${BASE_URL}/${os}`, otherFields);
  return response.data;
};

export const deleteBudgetItem = async (id: string): Promise<boolean> => {
  const response = await httpClient.delete<boolean>(`${BASE_URL}/${id}`);
  return response.data;
};
