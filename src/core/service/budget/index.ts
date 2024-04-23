import { DefaultError, useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';

import { ServiceApi } from '@core/api';
import type { TBudget, TBudgetCompleteResponse, TNewBudgetParams } from '@core/api/budget/types';
import { BudgetComplete } from '@core/models/budget/BudgetComplete';
import { BudgetListItem } from '@core/models/budget/BudgetListItem copy';
import useMutationApp from '@shared/hooks/useMutationApp';

export const useAddBudget = () => {
  return useMutationApp<TBudget, DefaultError, TNewBudgetParams>({
    mutationFn: async (data) => {
      const response = await ServiceApi.BudgetApi.addBudget(data);
      return response.data;
    },
  });
};

export const useApproveBudget = () => {
  return useMutationApp<boolean, DefaultError, string>({
    mutationFn: async (data) => {
      const response = await ServiceApi.BudgetApi.approveBudget(data);
      return response.data;
    },
  });
};

export const useSendForApproveBudget = () => {
  return useMutationApp<boolean, DefaultError, string>({
    mutationFn: async (data) => {
      const response = await ServiceApi.BudgetApi.sendForApproveBudget(data);
      return response.data;
    },
  });
};

export const useStartServiceBudget = () => {
  return useMutationApp<boolean, DefaultError, string>({
    mutationFn: async (data) => {
      const response = await ServiceApi.BudgetApi.startServiceBudget(data);
      return response.data;
    },
  });
};

export const useRemakeBudget = () => {
  return useMutationApp<boolean, DefaultError, string>({
    mutationFn: async (data) => {
      const response = await ServiceApi.BudgetApi.remakeBudget(data);
      return response.data;
    },
  });
};

export const useCompletedBudget = () => {
  return useMutationApp<boolean, DefaultError, string>({
    mutationFn: async (data) => {
      const response = await ServiceApi.BudgetApi.completedBudget(data);
      return response.data;
    },
  });
};

export const useFinishBudget = () => {
  return useMutationApp<boolean, DefaultError, string>({
    mutationFn: async (data) => {
      const response = await ServiceApi.BudgetApi.finishBudget(data);
      return response.data;
    },
  });
};

export const useListBudgets = () => {
  const [params] = useSearchParams();

  const license = params.get('license');

  return useQuery({
    queryKey: ['useListBudgets', license],
    queryFn: async () => {
      const { data } = await ServiceApi.BudgetApi.listBudgets(license);

      return data.map((item) => new BudgetListItem(item));
    },
  });
};

export const useGetBudget = () => {
  const { os: osParam } = useParams();

  return useQuery({
    enabled: !!osParam,
    queryKey: ['useGetBudget', osParam],
    queryFn: async () => {
      if (!osParam) {
        return {} as TBudgetCompleteResponse;
      }

      const { data } = await ServiceApi.BudgetApi.getBudget(osParam);

      return new BudgetComplete(data);
    },
  });
};
