import { DefaultError } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import type { TBudgetItem, TNewBudgetItem } from '@core/api/budget-item/types';
import useMutationApp from '@shared/hooks/useMutationApp';

export const useAddBudgetItem = () => {
  return useMutationApp<TBudgetItem, DefaultError, TNewBudgetItem>({
    mutationFn: async (data) => {
      const response = await ServiceApi.BudgetItemsApi.addBudgetItem(data);
      return response.data;
    },
  });
};

export const useDeleteBudgetItem = () => {
  return useMutationApp<boolean, DefaultError, string>({
    mutationFn: async (id) => {
      const response = await ServiceApi.BudgetItemsApi.deleteBudgetItem(id);
      return response.data;
    },
  });
};
