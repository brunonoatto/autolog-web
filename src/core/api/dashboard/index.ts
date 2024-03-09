import axios, { AxiosResponse } from 'axios';
import type { TDashboardItem } from '@core/api/dashboard/types';

const BASE_URL = 'http://localhost:3031/api/dashboard';

export const getDashboard = async (garageId: string): Promise<AxiosResponse<TDashboardItem[]>> => {
  const response = await axios.get<TDashboardItem[]>(`${BASE_URL}/${garageId}`);
  return response;
};
