import { useSearchParams } from 'react-router-dom';

import { ServiceApi } from '@core/api';
import { BudgetListItem } from '@core/models/budget/BudgetListItem';
import useQueryCustom from '@shared/hooks/useQueryCustom';

export const useListBudgets = () => {
  const [params] = useSearchParams();

  const license = params.get('license');

  const { data } = useQueryCustom({
    queryKey: ['useListBudgets', license],
    queryFn: async () => {
      const data = await ServiceApi.BudgetApi.listBudgets(license);

      return data.map((item) => new BudgetListItem(item));
    },
  });

  return {
    budgets: data || [],
  };
};
