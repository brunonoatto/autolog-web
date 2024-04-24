import { DefaultError, useQuery } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import { TUseTransferCarParams } from '@core/service/car/type';
import useMutationApp from '@shared/hooks/useMutationApp';

export const useGetCar = (license: string) => {
  return useQuery({
    enabled: false,
    queryKey: ['useGetCar', license],
    queryFn: async () => {
      const { data } = await ServiceApi.CarApi.get(license);

      return data;
    },
  });
};

export const useTransferCar = () => {
  return useMutationApp<boolean, DefaultError, TUseTransferCarParams>({
    mutationFn: async (data) => {
      const response = await ServiceApi.CarApi.transferCar(data.license, data.cpfOrCnpjToTransfer);
      return response.data;
    },
  });
};
