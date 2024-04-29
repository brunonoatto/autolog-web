import { ServiceApi } from '@core/api';
import { DashboardItem } from '@core/models/dashboard';
import useQueryCustom from '@shared/hooks/useQueryCustom';

export const useListDashboard = () => {
  return useQueryCustom({
    queryKey: ['useListDashboard'],
    queryFn: async () => {
      const items = await ServiceApi.DashboardApi.listDashboardItems();

      return items.map((item) => new DashboardItem(item));
    },
  });
};
