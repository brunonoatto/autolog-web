import { useQuery } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import { DashboardItem } from '@core/models/dashboard';

export const useListDashboard = () => {
  return useQuery({
    queryKey: ['useListDashboard'],
    queryFn: async () => {
      const items = await ServiceApi.DashboardApi.listDashboardItems();

      return items.map((item) => new DashboardItem(item));
    },
  });
};
