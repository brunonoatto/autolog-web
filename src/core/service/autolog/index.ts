import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import { DashboardItem } from '@core/models/autolog';
import type { TDashboardItemToAdd } from '@core/api/autolog/types';

export const useListDashboard = () => {
  return useQuery({
    queryKey: ['useListDashboard'],
    queryFn: async () => {
      const data = await ServiceApi.Autolog.listDashboard();
      return data.map((item) => new DashboardItem(item));
    },
  });
};

export const useAddDashboardItem = () => {
  return useMutation<unknown, DefaultError, TDashboardItemToAdd>({
    mutationFn: (item) => {
      return ServiceApi.Autolog.addDashboardItem(item);
    },
  });
};
