import { AxiosResponse } from 'axios';

import httpClient from '@core/api/HttpClient';
import type { TDashboardItem } from './types';

const BASE_URL = '/dashboard';

export const getDashboard = async (garageId: string): Promise<AxiosResponse<TDashboardItem[]>> => {
  const response = await httpClient.get<TDashboardItem[]>(`${BASE_URL}/${garageId}`);
  return response;
};
