import { useMutation } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';

export const useFinishBudget = () => {
  return useMutation({
    mutationFn: ServiceApi.BudgetApi.finishBudget,
  });
};
