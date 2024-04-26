import type { TClientResponse, TGetClientParams, TNewClient } from '@core/api/client/types';
import httpClient from '@core/api/HttpClient';

const BASE_URL = '/client';

export const post = async (newClient: TNewClient): Promise<boolean> => {
  const response = await httpClient.post<boolean>(BASE_URL, newClient);
  return response.data;
};

export const get = async ({
  cpf_cnpj,
  email,
  withCars = false,
}: TGetClientParams): Promise<TClientResponse> => {
  const response = await httpClient.get<TClientResponse>(BASE_URL, {
    params: { cpf_cnpj, email, withCars },
  });
  return response.data;
};
