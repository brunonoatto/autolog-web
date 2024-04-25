import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import type { TNewCar } from '@core/api/car/types';
import type { TUseTransferCarParams } from '@core/service/car/type';

export const useGetCar = (license: string) => {
  return useQuery({
    enabled: !!license,
    queryKey: ['useGetCar', license],
    queryFn: async () => {
      const { data } = await ServiceApi.CarApi.get(license);

      return data;
    },
  });
};

export const useCreateCar = () => {
  return useMutation<boolean, DefaultError, TNewCar>({
    mutationFn: async (data) => {
      const response = await ServiceApi.CarApi.post(data);
      return response.data;
    },
  });
};

export const useTransferCar = () => {
  return useMutation<boolean, DefaultError, TUseTransferCarParams>({
    mutationFn: async (data) => {
      const response = await ServiceApi.CarApi.transferCar(data.license, data.cpfOrCnpjToTransfer);
      return response.data;
    },
  });
};
