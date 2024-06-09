import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import { BudgetComplete } from '@core/models/budget/BudgetComplete';
import { USE_GET_BUDGET_QUERY_KEY } from '@core/service/budget/useGetBudget';

export const useObservationUpdate = (os?: string) => {
  const queryClient = useQueryClient();

  const getBudgetQueryKey = !!os && [USE_GET_BUDGET_QUERY_KEY, os];
  const optimisticActive = !!getBudgetQueryKey;

  return useMutation({
    mutationFn: ServiceApi.BudgetApi.observationUpdate,
    onMutate: (data) => {
      if (!optimisticActive) return;

      let oldObservation = '';
      queryClient.setQueryData<BudgetComplete>(getBudgetQueryKey, (old) => {
        oldObservation = old?.observation || '';

        return old
          ? {
              ...old,
              observation: data.observation,
            }
          : undefined;
      });

      return { oldObservation };
    },
    onError: async (_error, _variables, context) => {
      if (!optimisticActive) return;

      await queryClient.cancelQueries({ queryKey: getBudgetQueryKey });

      queryClient.setQueryData<BudgetComplete>(getBudgetQueryKey, (old) =>
        old
          ? {
              ...old,
              observation: context?.oldObservation,
            }
          : undefined,
      );
    },
  });
};
