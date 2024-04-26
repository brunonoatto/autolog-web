import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import type { TNewClient } from '@core/api/client/types';
import { TUseClientCarsParams } from '@core/service/client/types';

export const useCreateClient = () => {
  return useMutation<boolean, DefaultError, TNewClient>({
    mutationFn: ServiceApi.ClientApi.post,
  });
};

export const useClientCars = (params: TUseClientCarsParams = {}) => {
  return useQuery({
    queryKey: ['useClientCars', params],
    queryFn: async () => {
      const cars = await ServiceApi.CarApi.listByClient(params);

      return cars;
    },
  });
};
