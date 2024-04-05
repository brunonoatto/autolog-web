import { type AxiosResponse } from 'axios';

import type { TClientResponse, TGetClientParams, TNewClient } from '@core/api/client/types';
import httpClient from '@core/api/HttpClient';

const BASE_URL = '/client';

export const post = async (newClient: TNewClient): Promise<AxiosResponse<boolean>> => {
  const response = await httpClient.post<boolean>(BASE_URL, newClient);
  return response;
};

export const get = async ({
  cpf,
  email,
}: TGetClientParams): Promise<AxiosResponse<TClientResponse>> => {
  const response = await httpClient.get<TClientResponse>(BASE_URL, { params: { cpf, email } });
  return response;
};
