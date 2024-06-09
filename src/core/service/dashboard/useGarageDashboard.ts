import { ServiceApi } from '@core/api';
import { DashboardItem } from '@core/models/dashboard';
import useQueryCustom from '@shared/hooks/useQueryCustom';

export const useGarageDashboard = () => {
  return useQueryCustom({
    queryKey: ['useListDashboard'],
    queryFn: async () => {
      const items = await ServiceApi.DashboardApi.listGarageDashboard();

      return items.map((item) => new DashboardItem(item));
    },
  });
};
