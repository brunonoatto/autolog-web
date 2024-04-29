import axios from 'axios';

import type { TBrandResponse, TModelResponse } from './types';

const httpFipeClient = axios.create({ baseURL: 'https://parallelum.com.br/fipe/api/v2' });

export const listBrands = async (): Promise<TBrandResponse[]> => {
  const response = await httpFipeClient.get<TBrandResponse[]>('/cars/brands');
  return response.data;
};

export const listModelsBrand = async (brandId: string): Promise<TModelResponse[]> => {
  const response = await httpFipeClient.get<TModelResponse[]>(`/cars/brands/${brandId}/models`);
  return response.data;
};
