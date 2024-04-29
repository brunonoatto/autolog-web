import { useMutation } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';

export const useApproveBudget = () => {
  return useMutation({
    mutationFn: ServiceApi.BudgetApi.approveBudget,
  });
};
