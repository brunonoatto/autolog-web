import type {
  TCar,
  TClientCarsResponse,
  TGetByClientParams,
  TNewCar,
  TTransferCarProps,
} from '@core/api/car/types';
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

export const listClientCars = async ({
  clientId,
  transfereds = false,
}: TGetByClientParams): Promise<TClientCarsResponse[]> => {
  const response = await httpClient.get<TClientCarsResponse[]>(`${BASE_URL}/client`, {
    params: { clientId, transfereds },
    data: { noShowError: true },
  });
  return response.data;
};
