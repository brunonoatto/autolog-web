import { ServiceApi } from '@core/api';
import { TUseClientCarsParams } from '@core/service/client/types';
import useQueryCustom from '@shared/hooks/useQueryCustom';

export const useClientCars = (params: TUseClientCarsParams = {}) => {
  return useQueryCustom({
    queryKey: ['useClientCars', params],
    queryFn: async () => ServiceApi.CarApi.listByClient(params),
  });
};
