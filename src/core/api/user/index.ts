import httpClient from '@core/api/http-client';
import type { TNewClient, TNewGarage } from '@core/api/user/types';

const BASE_URL = '/user';

export const createClient = async (newClient: TNewClient): Promise<boolean> => {
  const response = await httpClient.post<boolean>(`${BASE_URL}/create-client`, newClient);
  return response.data;
};

export const createGarage = async (newGarage: TNewGarage): Promise<boolean> => {
  const response = await httpClient.post<boolean>(`${BASE_URL}/create-garage`, newGarage);
  return response.data;
};
