import { useParams } from 'react-router-dom';

import { ServiceApi } from '@core/api';
import { BudgetComplete } from '@core/models/budget/BudgetComplete';
import useQueryCustom from '@shared/hooks/useQueryCustom';

export const USE_GET_BUDGET_QUERY_KEY = 'useGetBudget';
export const useGetBudget = () => {
  const { os: osParam } = useParams();

  const { data, isLoading } = useQueryCustom({
    enabled: !!osParam,
    queryKey: [USE_GET_BUDGET_QUERY_KEY, osParam],
    queryFn: async () => {
      if (!osParam) {
        return {} as BudgetComplete;
      }

      const data = await ServiceApi.BudgetApi.getBudget(osParam);

      return new BudgetComplete(data);
    },
  });

  return {
    budget: data,
    isLoading,
  };
};
