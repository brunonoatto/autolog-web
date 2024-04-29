import { useMutation } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';

export const useTransferCar = () => {
  return useMutation({
    mutationFn: ServiceApi.CarApi.transferCar,
  });
};
