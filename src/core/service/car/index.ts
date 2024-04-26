import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import type { TNewCar } from '@core/api/car/types';
import type { TUseTransferCarParams } from '@core/service/car/type';

export const useGetCar = (license: string) => {
  return useQuery({
    enabled: !!license,
    queryKey: ['useGetCar', license],
    queryFn: async () => {
      const car = await ServiceApi.CarApi.get(license);

      return car;
    },
  });
};

export const useCreateCar = () => {
  return useMutation<boolean, DefaultError, TNewCar>({
    mutationFn: ServiceApi.CarApi.post,
  });
};

export const useTransferCar = () => {
  return useMutation<boolean, DefaultError, TUseTransferCarParams>({
    mutationFn: ServiceApi.CarApi.transferCar,
  });
};
