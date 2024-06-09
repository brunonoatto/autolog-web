import type { TCar, TNewCar, TTransferCarProps } from '@core/api/car/types';
import httpClient from '@core/api/http-client';

const BASE_URL = '/car';

export const get = async (license: string, noShowError: boolean = false): Promise<TCar> => {
  const response = await httpClient.get<TCar>(`${BASE_URL}/${license}`, { data: { noShowError } });
  return response.data;
};

export const post = async (data: TNewCar): Promise<boolean> => {
  const response = await httpClient.post<boolean>(BASE_URL, data);
  return response.data;
};

export const transferCar = async ({
  carId,
  clientIdToTransfer,
}: TTransferCarProps): Promise<boolean> => {
  const response = await httpClient.patch<boolean>(
    `${BASE_URL}/${carId}/transfer/${clientIdToTransfer}`,
  );
  return response.data;
};
