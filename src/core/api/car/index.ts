import type {
  TCar,
  TCarGetResponse,
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

export const listByClient = async ({
  clientId = '',
  transfereds = false,
}: TGetByClientParams): Promise<TCarGetResponse[]> => {
  const response = await httpClient.get<TCarGetResponse[]>(`${BASE_URL}/client/cars`, {
    params: { transfereds, clientId },
    data: { noShowError: true },
  });
  return response.data;
};

export const transferCar = async ({
  license,
  cpfOrCnpjToTransfer,
}: TTransferCarProps): Promise<boolean> => {
  const response = await httpClient.patch<boolean>(
    `${BASE_URL}/${license}/transfer/${cpfOrCnpjToTransfer}`,
  );
  return response.data;
};
