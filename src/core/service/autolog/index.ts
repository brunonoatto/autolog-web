import { useQuery } from '@tanstack/react-query';
import { ServiceApi } from '../../api';
import { DashboardItem } from '@core/models/autolog';

export const useListDashboard = () => {
  return useQuery({
    queryKey: ['useListDashboard'],
    queryFn: async () => {
      const data = await ServiceApi.Autolog.listDashboard();
      return data.map((item) => new DashboardItem(item));
    },
  });
};
