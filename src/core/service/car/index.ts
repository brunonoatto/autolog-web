import { useQuery } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';

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
