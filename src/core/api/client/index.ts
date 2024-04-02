import { type AxiosResponse } from 'axios';

import type { TClientResponse, TGetClientParams } from '@core/api/client/types';
import httpClient from '@core/api/HttpClient';

const BASE_URL = '/client';

export const get = async ({
  cpf,
  email,
}: TGetClientParams): Promise<AxiosResponse<TClientResponse>> => {
  const response = await httpClient.get<TClientResponse>(BASE_URL, { params: { cpf, email } });
  return response;
};
