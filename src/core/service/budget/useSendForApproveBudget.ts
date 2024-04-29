import { useMutation } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';

export const useSendForApproveBudget = () => {
  return useMutation({
    mutationFn: ServiceApi.BudgetApi.sendForApproveBudget,
  });
};
