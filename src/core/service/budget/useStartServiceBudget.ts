import { useMutation } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';

export const useStartServiceBudget = () => {
  return useMutation({
    mutationFn: ServiceApi.BudgetApi.startServiceBudget,
  });
};
