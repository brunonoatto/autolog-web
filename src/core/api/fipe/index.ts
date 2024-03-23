import axios from 'axios';
import type { TListBrandModelsResponse, TListCarsBrandsResponse } from './types';

const httpFipeClient = axios.create({ baseURL: 'https://parallelum.com.br/fipe/api/v2' });

export const listBrands = async (): Promise<TListCarsBrandsResponse[]> => {
  const response = await httpFipeClient.get<TListCarsBrandsResponse[]>('/cars/brands');
  return response.data;
};

export const listModelsBrand = async (brandId: string): Promise<TListBrandModelsResponse[]> => {
  const response = await httpFipeClient.get<TListBrandModelsResponse[]>(
    `/cars/brands/${brandId}/models`,
  );
  return response.data;
};
