import { useQuery } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import { DashboardItem } from '@core/models/dashboard';
import { useAuthStore } from '@core/store/hooks';

export const useListDashboard = (enabled = true) => {
  const { id: garageId } = useAuthStore((props) => props.garage);

  return useQuery({
    enabled,
    queryKey: ['useListDashboard', garageId],
    queryFn: async () => {
      const { data } = await ServiceApi.DashboardApi.getDashboard(garageId);

      return data.map((item) => new DashboardItem(item));
    },
  });
};
