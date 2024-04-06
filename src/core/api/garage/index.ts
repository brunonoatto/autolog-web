import { type AxiosResponse } from 'axios';

import type { TNewGarage } from '@core/api/garage/types';
import httpClient from '@core/api/HttpClient';

const BASE_URL = '/garage';

export const post = async (newClient: TNewGarage): Promise<AxiosResponse<boolean>> => {
  const response = await httpClient.post<boolean>(BASE_URL, newClient);
  return response;
};
