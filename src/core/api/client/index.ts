import type { TClientResponse, TGetClientParams } from '@core/api/client/types';
import httpClient from '@core/api/http-client';

const BASE_URL = '/client';

export const get = async ({
  cpfCnpj,
  email,
  withCars = false,
}: TGetClientParams): Promise<TClientResponse> => {
  const { data } = await httpClient.get<TClientResponse>(BASE_URL, {
    params: { cpfCnpj, email, withCars },
    data: { noShowError: true },
  });

  // TODO: retornar uma classe com cpfCnpjFormatado
  return data;
};
