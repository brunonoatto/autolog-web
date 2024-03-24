import { useQuery } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import { DashboardItem } from '@core/models/dashboard';

export const useListDashboard = (enabled = true) => {
  return useQuery({
    enabled,
    queryKey: ['useListDashboard'],
    queryFn: async () => {
      const { data } = await ServiceApi.DashboardApi.getDashboard();

      return data.map((item) => new DashboardItem(item));
    },
  });
};
