import { useMutation } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';

export const useCreateCar = () => {
  return useMutation({
    mutationFn: ServiceApi.CarApi.post,
  });
};
