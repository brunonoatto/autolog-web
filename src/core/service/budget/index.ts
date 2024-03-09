import { DefaultError, useMutation } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import type { TAddBudgetParams, TBudget } from '@core/api/budget/types';
import { useAuthStore } from '@core/store/hooks';

export const useAddBudget = () => {
  const { id: garageId } = useAuthStore((props) => props.garage);

  return useMutation<TBudget, DefaultError, Omit<TAddBudgetParams, 'garageId'>>({
    mutationFn: async (data) => {
      const response = await ServiceApi.BudgetApi.addBudget({ ...data, garageId });
      return response.data;
    },
  });
};
