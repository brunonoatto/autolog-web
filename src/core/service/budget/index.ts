import { DefaultError, useMutation } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import type { TAddBudgetParams, TBudget } from '@core/api/budget/types';

export const useAddBudget = () => {
  return useMutation<TBudget, DefaultError, TAddBudgetParams>({
    mutationFn: async (data) => {
      const response = await ServiceApi.BudgetApi.addBudget(data);
      return response.data;
    },
  });
};
