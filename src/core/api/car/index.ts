import axios, { AxiosResponse } from 'axios';

import type { TCar } from '@core/api/car/types';

const BASE_URL = 'http://localhost:3031/api/car';

export const get = async (license: string): Promise<AxiosResponse<TCar>> => {
  const response = await axios.get<TCar>(`${BASE_URL}/${license}`);
  return response;
};
