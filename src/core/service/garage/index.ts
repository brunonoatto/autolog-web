import { DefaultError, useMutation } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import type { TNewGarage } from '@core/api/garage/types';

export const useCreateGarage = () => {
  return useMutation<boolean, DefaultError, TNewGarage>({
    mutationFn: ServiceApi.GarageApi.post,
  });
};
