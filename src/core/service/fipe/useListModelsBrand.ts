import { ServiceApi } from '@core/api';
import useQueryCustom from '@shared/hooks/useQueryCustom';

export const useListModelsBrand = (brandId: string) => {
  return useQueryCustom({
    enabled: !!brandId && !!Number(brandId),
    staleTime: Infinity,
    queryKey: ['useListModelsBrand', brandId],
    queryFn: async () => ServiceApi.FipeApi.listModelsBrand(brandId),
  });
};
