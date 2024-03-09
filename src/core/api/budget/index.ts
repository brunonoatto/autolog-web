import axios, { type AxiosResponse } from 'axios';

import type { TAddBudgetParams, TBudget } from '@core/api/budget/types';

const BASE_URL = 'http://localhost:3031/api/budget';

export const addBudget = async (data: TAddBudgetParams): Promise<AxiosResponse<TBudget>> => {
  const response = await axios.post<TBudget>(`${BASE_URL}`, data);
  return response;
};
