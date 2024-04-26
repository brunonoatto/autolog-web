import httpClient from '@core/api/HttpClient';

import type { TLoginParams, TLoginResponse } from './types';

export const login = async (data: TLoginParams): Promise<TLoginResponse> => {
  const response = await httpClient.post<TLoginResponse>('/login', data);
  return response.data;
};
