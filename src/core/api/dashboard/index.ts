import httpClient from '@core/api/http-client';

import type { TDashboardItem } from './types';

const BASE_URL = '/dashboard';

export const listDashboardItems = async (): Promise<TDashboardItem[]> => {
  const response = await httpClient.get<TDashboardItem[]>(BASE_URL);
  return response.data;
};
