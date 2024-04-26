import { ServiceApi } from '@core/api';
import useQueryCustom from '@shared/hooks/useQueryCustom';

export const useListBrands = () => {
  return useQueryCustom({
    staleTime: Infinity,
    queryKey: ['useListBrands'],
    queryFn: ServiceApi.FipeApi.listBrands,
  });
};

export const useListModelsBrand = (brandId: string) => {
  return useQueryCustom({
    enabled: !!brandId && !!Number(brandId),
    staleTime: Infinity,
    queryKey: ['useListModelsBrand', brandId],
    queryFn: async () => ServiceApi.FipeApi.listModelsBrand(brandId),
  });
};
