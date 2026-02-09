import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { ServiceApi } from '@core/api';
import { BudgetComplete } from '@core/models/budget/BudgetComplete';
import { USE_GET_BUDGET_QUERY_KEY } from '@core/service/budget/useGetBudget';

export const useUpdateBudgetItem = () => {
  const queryClient = useQueryClient();

  const { osOrBudgetId } = useParams();
  const getBudgetQueryKey = [USE_GET_BUDGET_QUERY_KEY, osOrBudgetId];

  return useMutation({
    mutationFn: ServiceApi.BudgetItemsApi.updateBudgetItem,
    onMutate: async (updatedItem) => {
      await queryClient.cancelQueries({ queryKey: getBudgetQueryKey });

      const budget = queryClient.getQueryData<BudgetComplete>(getBudgetQueryKey);

      queryClient.setQueryData<BudgetComplete>(getBudgetQueryKey, (old) =>
        old
          ? {
              ...old,
              items: old.items.map((item) =>
                item.id === updatedItem.id
                  ? { ...item, ...updatedItem, recordStatus: 'pending' }
                  : item,
              ),
            }
          : undefined,
      );

      return { itemPrevious: budget?.items.find((item) => item.id === updatedItem.id) };
    },
    onSuccess: async (_data, updatedItem) => {
      await queryClient.cancelQueries({ queryKey: getBudgetQueryKey });

      queryClient.setQueryData<BudgetComplete>(getBudgetQueryKey, (old) =>
        old
          ? {
              ...old,
              items: old.items.map((item) =>
                item.id === updatedItem.id ? { id: item.id, ...updatedItem } : item,
              ),
            }
          : undefined,
      );
    },
    onError: async (_error, updatedItem, context) => {
      await queryClient.cancelQueries({ queryKey: getBudgetQueryKey });

      if (!context?.itemPrevious) return;

      queryClient.setQueryData<BudgetComplete>(getBudgetQueryKey, (old) =>
        old
          ? {
              ...old,
              items: old.items.map((item) =>
                item.id === updatedItem.id ? context.itemPrevious! : item,
              ),
            }
          : undefined,
      );
    },
  });
};
