import { useMutation } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';

export const useAddBudget = () => {
  return useMutation({
    mutationFn: ServiceApi.BudgetApi.addBudget,
  });
};
