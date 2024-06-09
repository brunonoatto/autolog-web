import { ServiceApi } from '@core/api';
import { BudgetListItem } from '@core/models/budget/BudgetListItem';
import useQueryCustom from '@shared/hooks/useQueryCustom';

export const useListBudgetsCar = (license: string) => {
  const { data, isLoading } = useQueryCustom({
    queryKey: ['useListBudgets', license],
    queryFn: async () => {
      const data = await ServiceApi.BudgetApi.listBudgets(license);

      return data.map((item) => new BudgetListItem(item));
    },
  });
  return {
    budgets: data || [],
    isLoading,
  };
};
