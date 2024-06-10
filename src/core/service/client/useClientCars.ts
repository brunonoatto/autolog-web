import { ServiceApi } from '@core/api';
import type { TUseClientCarsParams } from '@core/service/client/types';
import useQueryCustom from '@shared/hooks/useQueryCustom';

export const useClientCars = (params: TUseClientCarsParams = {}) => {
  const { data, isLoading } = useQueryCustom({
    queryKey: ['useClientCars', params],
    queryFn: async () => ServiceApi.CarApi.listClientCars(params),
  });

  return {
    cars: data || [],
    isLoading,
  };
};
