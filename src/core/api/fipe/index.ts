import axios from 'axios';
import type { TListBrandModelsResponse, TListCarsBrandsResponse } from './types';

const BASE_URL = 'https://parallelum.com.br/fipe/api/v2';

export const listBrands = async (): Promise<TListCarsBrandsResponse[]> => {
  const response = await axios.get<TListCarsBrandsResponse[]>(`${BASE_URL}/cars/brands`);
  return response.data;
};

export const listModelsBrand = async (brandId: string): Promise<TListBrandModelsResponse[]> => {
  const response = await axios.get<TListBrandModelsResponse[]>(`${BASE_URL}/cars/brands/${brandId}/models`);
  return response.data;
};
