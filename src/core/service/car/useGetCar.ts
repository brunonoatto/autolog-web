import { ServiceApi } from '@core/api';
import useQueryCustom from '@shared/hooks/useQueryCustom';

export const useGetCar = (license: string) => {
  return useQueryCustom({
    enabled: !!license,
    queryKey: ['useGetCar', license],
    queryFn: async () => ServiceApi.CarApi.get(license),
  });
};
