import { useMutation } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';

export const useCompletedBudget = () => {
  return useMutation({
    mutationFn: ServiceApi.BudgetApi.completedBudget,
  });
};
