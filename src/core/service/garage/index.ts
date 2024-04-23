import { DefaultError } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import type { TNewGarage } from '@core/api/garage/types';
import useMutationApp from '@shared/hooks/useMutationApp';

export const useCreateGarage = () => {
  return useMutationApp<boolean, DefaultError, TNewGarage>({
    mutationFn: async (data) => {
      const response = await ServiceApi.GarageApi.post(data);

      return response.data;
    },
  });
};
