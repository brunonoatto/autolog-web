import { type AxiosResponse } from 'axios';

import httpClient from '@core/api/HttpClient';
import type { TLoginParams, TLoginResponse } from './types';

const BASE_URL = '/garage';

export const login = async (data: TLoginParams): Promise<AxiosResponse<TLoginResponse>> => {
  const response = await httpClient.post<TLoginResponse>(`${BASE_URL}/login`, data);
  return response;
};
