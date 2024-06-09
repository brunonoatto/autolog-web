import httpClient from '@core/api/http-client';

import type { TDashboardItem } from './types';

const BASE_URL = '/dashboard';

export const listGarageDashboard = async (): Promise<TDashboardItem[]> => {
  const response = await httpClient.get<TDashboardItem[]>(`${BASE_URL}/garage`);
  return response.data;
};
