import { ServiceApi } from '@core/api';
import { TPaginationResponse } from '@core/api/types';
import { BudgetListItem } from '@core/models/budget/BudgetListItem';
import { usePagination } from '@shared/hooks/usePaginations';
import useQueryCustom from '@shared/hooks/useQueryCustom';

export const useListBudgetsCar = (license: string) => {
  const { pageNumber, pageSize } = usePagination();

  const { data, isLoading } = useQueryCustom({
    queryKey: ['useListBudgets', license, pageNumber, pageSize],
    queryFn: async () => {
      const data = await ServiceApi.BudgetApi.listBudgets({ license, pageNumber, pageSize });

      data.items = data.items.map((item) => new BudgetListItem(item));

      return data as TPaginationResponse<BudgetListItem>;
    },
  });

  return {
    isLoading,
    budgets: data?.items || [],
    totalItems: data?.totalItems || 0,
    totalPages: data?.totalPages || 1,
  };
};
