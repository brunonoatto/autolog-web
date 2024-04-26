import { useMutation } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';

import { ServiceApi } from '@core/api';
import { BudgetComplete } from '@core/models/budget/BudgetComplete';
import { BudgetListItem } from '@core/models/budget/BudgetListItem copy';
import useQueryCustom from '@shared/hooks/useQueryCustom';

export const useAddBudget = () => {
  return useMutation({
    mutationFn: ServiceApi.BudgetApi.addBudget,
  });
};

export const useApproveBudget = () => {
  return useMutation({
    mutationFn: ServiceApi.BudgetApi.approveBudget,
  });
};

export const useSendForApproveBudget = () => {
  return useMutation({
    mutationFn: ServiceApi.BudgetApi.sendForApproveBudget,
  });
};

export const useStartServiceBudget = () => {
  return useMutation({
    mutationFn: ServiceApi.BudgetApi.startServiceBudget,
  });
};

export const useRemakeBudget = () => {
  return useMutation({
    mutationFn: ServiceApi.BudgetApi.remakeBudget,
  });
};

export const useCompletedBudget = () => {
  return useMutation({
    mutationFn: ServiceApi.BudgetApi.completedBudget,
  });
};

export const useFinishBudget = () => {
  return useMutation({
    mutationFn: ServiceApi.BudgetApi.finishBudget,
  });
};

export const useListBudgets = () => {
  const [params] = useSearchParams();

  const license = params.get('license');

  const { data } = useQueryCustom({
    queryKey: ['useListBudgets', license],
    queryFn: async () => {
      const data = await ServiceApi.BudgetApi.listBudgets(license);

      return data.map((item) => new BudgetListItem(item));
    },
  });

  return {
    budgets: data || [],
  };
};

export const USE_GET_BUDGET_QUERY_KEY = 'useGetBudget';
export const useGetBudget = () => {
  const { os: osParam } = useParams();

  const { data } = useQueryCustom({
    enabled: !!osParam,
    queryKey: [USE_GET_BUDGET_QUERY_KEY, osParam],
    queryFn: async () => {
      if (!osParam) {
        return {} as BudgetComplete;
      }

      const data = await ServiceApi.BudgetApi.getBudget(osParam);

      return new BudgetComplete(data);
    },
  });

  return {
    budget: data,
  };
};
