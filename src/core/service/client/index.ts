import { DefaultError, useQuery } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import type { TNewClient } from '@core/api/client/types';
import { TUseClientCarsParams } from '@core/service/client/types';
import useMutationApp from '@shared/hooks/useMutationApp';

export const useCreateClient = () => {
  return useMutationApp<boolean, DefaultError, TNewClient>({
    mutationFn: async (data) => {
      const response = await ServiceApi.ClientApi.post(data);

      return response.data;
    },
  });
};

export const useClientCars = (params: TUseClientCarsParams = {}) => {
  return useQuery({
    queryKey: ['useClientCars', params],
    queryFn: async () => {
      const { data } = await ServiceApi.CarApi.getByClient(params);

      return data;
    },
  });
};
