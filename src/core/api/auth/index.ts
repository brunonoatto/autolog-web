import type { AxiosResponse } from 'axios';

import httpClient from '@core/api/HttpClient';

import type { TLoginParams, TLoginResponse } from './types';

export const login = async (data: TLoginParams): Promise<AxiosResponse<TLoginResponse>> => {
  const response = await httpClient.post<TLoginResponse>('/login', data);
  return response;
};
