import { useQuery } from '@tanstack/react-query';
import { ServiceApi } from '../api';

export const useListBrands = () => {
  return useQuery({
    queryKey: ['useListBrands'],
    queryFn: async () => {
      const data = await ServiceApi.FipeApi.listBrands();
      return data;
    },
    staleTime: Infinity,
  });
};

export const useListModelsBrand = (brandId: string) => {
  return useQuery({
    queryKey: ['useListModelsBrand', brandId],
    queryFn: async () => {
      const data = await ServiceApi.FipeApi.listModelsBrand(brandId);
      return data;
    },
    enabled: !!brandId,
    staleTime: Infinity,
  });
};
