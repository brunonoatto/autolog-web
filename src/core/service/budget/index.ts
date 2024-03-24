import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import type { TAddBudgetParams, TBudget } from '@core/api/budget/types';
import { useSearchParams } from 'react-router-dom';

export const useAddBudget = () => {
  return useMutation<TBudget, DefaultError, TAddBudgetParams>({
    mutationFn: async (data) => {
      const response = await ServiceApi.BudgetApi.addBudget(data);
      return response.data;
    },
  });
};

export const useListBudgets = () => {
  const [params] = useSearchParams();

  const license = params.get('license');

  return useQuery({
    queryKey: ['useListBudgets', license],
    queryFn: async () => {
      const { data } = await ServiceApi.BudgetApi.listBudgets(license);

      return data;
    },
  });
};
