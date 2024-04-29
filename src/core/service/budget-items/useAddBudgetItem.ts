import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { ServiceApi } from '@core/api';
import { BudgetComplete } from '@core/models/budget/BudgetComplete';
import { USE_GET_BUDGET_QUERY_KEY } from '@core/service/budget/useGetBudget';

export const useAddBudgetItem = () => {
  const queryClient = useQueryClient();

  const { os } = useParams();
  const getBudgetQueryKey = [USE_GET_BUDGET_QUERY_KEY, os];

  return useMutation({
    mutationFn: ServiceApi.BudgetItemsApi.addBudgetItem,
    onMutate: (data) => {
      const tmpItemId = String(Math.random());

      queryClient.setQueryData<BudgetComplete>(getBudgetQueryKey, (old) =>
        old
          ? {
              ...old,
              items: old.items.concat({ ...data, id: tmpItemId, recordStatus: 'pending' }),
            }
          : undefined,
      );

      return { tmpItemId };
    },
    onSuccess: async (data, _, context) => {
      queryClient.setQueryData<BudgetComplete>(getBudgetQueryKey, (old) =>
        old
          ? {
              ...old,
              items: old.items.map((item) => (item.id === context.tmpItemId ? data : item)),
            }
          : undefined,
      );
    },
    onError: async (_error, _variabled, context) => {
      await queryClient.cancelQueries({ queryKey: getBudgetQueryKey });

      queryClient.setQueryData<BudgetComplete>(getBudgetQueryKey, (old) =>
        old
          ? {
              ...old,
              items: old.items.filter((item) => item.id !== context?.tmpItemId),
            }
          : undefined,
      );
    },
  });
};
