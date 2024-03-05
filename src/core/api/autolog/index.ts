import axios, { AxiosResponse } from 'axios';

import type { TDashboardItem, TDashboardItemToAdd } from './types';

const BASE_URL = 'http://localhost:3000';

export const listDashboard = async (): Promise<TDashboardItem[]> => {
  const response = await axios.get<TDashboardItem[]>(`${BASE_URL}/dashboard`);
  return response.data;
};

export const addDashboardItem = async (
  item: TDashboardItemToAdd,
): Promise<AxiosResponse<TDashboardItem>> => {
  return axios.post<TDashboardItem>(`${BASE_URL}/dashboard`, item);
};
