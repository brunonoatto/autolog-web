import { AxiosResponse } from 'axios';

import type { TCar } from '@core/api/car/types';
import httpClient from '@core/api/HttpClient';

const BASE_URL = '/car';

export const get = async (license: string): Promise<AxiosResponse<TCar>> => {
  const response = await httpClient.get<TCar>(`${BASE_URL}/${license}`);
  return response;
};

export const getByClient = async (clientId?: string): Promise<AxiosResponse<TCar[]>> => {
  const response = await httpClient.get<TCar[]>(`${BASE_URL}/client/${clientId}`);
  return response;
};

export const transferCar = async (
  license: string,
  cpfToTransfer: string,
): Promise<AxiosResponse<boolean>> => {
  const response = await httpClient.patch<boolean>(
    `${BASE_URL}/${license}/transfer/${cpfToTransfer}`,
  );
  return response;
};
