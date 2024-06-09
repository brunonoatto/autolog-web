import type {
  TCarGetResponse,
  TClientResponse,
  TGetByClientParams,
  TGetClientParams,
} from '@core/api/client/types';
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

export const listCarsByClient = async ({
  clientId = '',
  transfereds = false,
}: TGetByClientParams): Promise<TCarGetResponse[]> => {
  // TODO: porenquanto o clientId deve sempre ser enviado na rota
  const response = await httpClient.get<TCarGetResponse[]>(`${BASE_URL}/${clientId}/cars`, {
    // params: { transfereds, clientId },
    params: { transfereds },
    data: { noShowError: true },
  });
  return response.data;
};
