import { DefaultError, useMutation } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import type { TNewClient } from '@core/api/client/types';
import { TUseClientCarsParams } from '@core/service/client/types';
import useQueryCustom from '@shared/hooks/useQueryCustom';

export const useCreateClient = () => {
  return useMutation<boolean, DefaultError, TNewClient>({
    mutationFn: ServiceApi.ClientApi.post,
  });
};

export const useClientCars = (params: TUseClientCarsParams = {}) => {
  return useQueryCustom({
    queryKey: ['useClientCars', params],
    queryFn: async () => ServiceApi.CarApi.listByClient(params),
  });
};
