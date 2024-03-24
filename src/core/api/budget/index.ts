import { type AxiosResponse } from 'axios';

import httpClient from '@core/api/HttpClient';
import type { TAddBudgetParams, TBudget } from './types';

const BASE_URL = '/budget';

export const addBudget = async (data: TAddBudgetParams): Promise<AxiosResponse<TBudget>> => {
  const response = await httpClient.post<TBudget>(BASE_URL, data);
  return response;
};

export const listBudgets = async (license: string | null): Promise<AxiosResponse<TBudget[]>> => {
  const response = await httpClient.get<TBudget[]>(BASE_URL, { params: { license } });
  return response;
};
