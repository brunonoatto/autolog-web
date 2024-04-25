import { AxiosResponse } from 'axios';

import type { TCar, TCarGetResponse, TGetByClientParams, TNewCar } from '@core/api/car/types';
import httpClient from '@core/api/HttpClient';

const BASE_URL = '/car';

export const get = async (license: string): Promise<AxiosResponse<TCar>> => {
  const response = await httpClient.get<TCar>(`${BASE_URL}/${license}`);
  return response;
};

export const post = async (data: TNewCar): Promise<AxiosResponse<boolean>> => {
  const response = await httpClient.post<boolean>(BASE_URL, data);
  return response;
};

export const getByClient = async ({
  clientId = '',
  transfereds = false,
}: TGetByClientParams): Promise<AxiosResponse<TCarGetResponse[]>> => {
  const response = await httpClient.get<TCarGetResponse[]>(`${BASE_URL}/client/cars`, {
    params: { transfereds, clientId },
    data: { noShowError: true },
  });
  return response;
};

export const transferCar = async (
  license: string,
  cpfOrCnpjToTransfer: string,
): Promise<AxiosResponse<boolean>> => {
  const response = await httpClient.patch<boolean>(
    `${BASE_URL}/${license}/transfer/${cpfOrCnpjToTransfer}`,
  );
  return response;
};
