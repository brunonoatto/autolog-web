import { useMutation } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';

export const useRemakeBudget = () => {
  return useMutation({
    mutationFn: ServiceApi.BudgetApi.remakeBudget,
  });
};
