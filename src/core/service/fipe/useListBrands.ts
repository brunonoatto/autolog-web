import { ServiceApi } from '@core/api';
import useQueryCustom from '@shared/hooks/useQueryCustom';

export const useListBrands = () => {
  return useQueryCustom({
    staleTime: Infinity,
    queryKey: ['useListBrands'],
    queryFn: ServiceApi.FipeApi.listBrands,
  });
};
