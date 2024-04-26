import { DefaultError, useMutation } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import type { TNewCar } from '@core/api/car/types';
import type { TUseTransferCarParams } from '@core/service/car/type';
import useQueryCustom from '@shared/hooks/useQueryCustom';

export const useGetCar = (license: string) => {
  return useQueryCustom({
    enabled: !!license,
    queryKey: ['useGetCar', license],
    queryFn: async () => ServiceApi.CarApi.get(license),
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
