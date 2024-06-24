import { useParams } from 'react-router-dom';

import { ServiceApi } from '@core/api';
import { BudgetComplete } from '@core/models/budget/BudgetComplete';
import useQueryCustom from '@shared/hooks/useQueryCustom';

export const USE_GET_BUDGET_QUERY_KEY = 'useGetBudget';
export const useGetBudget = () => {
  const { osOrBudgetId } = useParams();

  const { data, isLoading } = useQueryCustom({
    enabled: !!osOrBudgetId,
    queryKey: [USE_GET_BUDGET_QUERY_KEY, osOrBudgetId],
    queryFn: async () => {
      if (!osOrBudgetId) {
        return undefined;
      }

      const data = await ServiceApi.BudgetApi.getBudget(osOrBudgetId);

      return new BudgetComplete(data);
    },
  });

  return {
    budget: data,
    isLoading,
  };
};
