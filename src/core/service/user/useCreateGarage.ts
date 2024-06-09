import { useMutation } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';

export const useCreateGarage = () => {
  return useMutation({
    mutationFn: ServiceApi.UserApi.createGarage,
  });
};
