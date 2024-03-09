import axios, { type AxiosResponse } from 'axios';

import type { TLoginParams } from '@core/api/auth/types';
import { TGarage } from '@core/api/garage/types';

const BASE_URL = 'http://localhost:3031/api/garage';

export const login = async (data: TLoginParams): Promise<AxiosResponse<TGarage>> => {
  const response = await axios.post<TGarage>(`${BASE_URL}/login`, data);
  return response;
};
