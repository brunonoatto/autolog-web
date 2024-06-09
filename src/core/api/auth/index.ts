import httpClient from '@core/api/http-client';

import type { TLoginParams, TLoginResponse } from './types';

const BASE_URL = '/auth';

export const login = async (data: TLoginParams): Promise<TLoginResponse> => {
  const response = await httpClient.post<TLoginResponse>(`${BASE_URL}/login`, data);
  return response.data;
};
