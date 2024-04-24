import { DefaultError, useMutation } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import type { TBudgetItem, TNewBudgetItem } from '@core/api/budget-item/types';

export const useAddBudgetItem = () => {
  return useMutation<TBudgetItem, DefaultError, TNewBudgetItem>({
    mutationFn: async (data) => {
      const response = await ServiceApi.BudgetItemsApi.addBudgetItem(data);
      return response.data;
    },
  });
};

export const useDeleteBudgetItem = () => {
  return useMutation<boolean, DefaultError, string>({
    mutationFn: async (id) => {
      const response = await ServiceApi.BudgetItemsApi.deleteBudgetItem(id);
      return response.data;
    },
  });
};
