import type { AxiosResponse } from 'axios';

import httpClient from '@core/api/HttpClient';

import type { TBudgetItem, TNewBudgetItem } from './types';

const BASE_URL = '/budget-item';

export const addBudgetItem = async ({
  os,
  ...otherFields
}: TNewBudgetItem): Promise<AxiosResponse<TBudgetItem>> => {
  const response = await httpClient.post<TBudgetItem>(`${BASE_URL}/${os}`, otherFields);
  return response;
};

export const deleteBudgetItem = async (id: string): Promise<AxiosResponse<boolean>> => {
  const response = await httpClient.delete<boolean>(`${BASE_URL}/${id}`);
  return response;
};
