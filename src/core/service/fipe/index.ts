import { useQuery } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';

export const useListBrands = () => {
  return useQuery({
    queryKey: ['useListBrands'],
    queryFn: ServiceApi.FipeApi.listBrands,
    staleTime: Infinity,
  });
};

export const useListModelsBrand = (brandId: string) => {
  return useQuery({
    queryKey: ['useListModelsBrand', brandId],
    queryFn: async () => {
      return ServiceApi.FipeApi.listModelsBrand(brandId);
    },
    enabled: !!brandId && !!Number(brandId),
    staleTime: Infinity,
  });
};
