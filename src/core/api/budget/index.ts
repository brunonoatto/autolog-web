import httpClient from '@core/api/http-client';

import type {
  TBudget,
  TBudgetCompleteResponse,
  TBudgetListItemResponse,
  TGetWhatsLinkResponse,
  TNewBudgetParams,
  TObservationUpdateParams,
} from './types';

const BASE_URL = '/budget';

export const createBudget = async (data: TNewBudgetParams): Promise<TBudget> => {
  const response = await httpClient.post<TBudget>(BASE_URL, data);
  return response.data;
};

export const listBudgets = async (license: string): Promise<TBudgetListItemResponse[]> => {
  const response = await httpClient.get<TBudgetListItemResponse[]>(BASE_URL, {
    params: { license },
  });
  return response.data;
};

export const getBudget = async (os: string): Promise<TBudgetCompleteResponse> => {
  const response = await httpClient.get<TBudgetCompleteResponse>(`${BASE_URL}/${os}`);
  return response.data;
};

export const approveBudget = async (budgetId: string): Promise<boolean> => {
  const response = await httpClient.patch<boolean>(`${BASE_URL}/approve/${budgetId}`);
  return response.data;
};

export const sendForApproveBudget = async (budgetId: string): Promise<boolean> => {
  const response = await httpClient.patch<boolean>(`${BASE_URL}/send-for-approve/${budgetId}`);
  return response.data;
};

export const startServiceBudget = async (budgetId: string): Promise<boolean> => {
  const response = await httpClient.patch<boolean>(`${BASE_URL}/start-service/${budgetId}`);
  return response.data;
};

export const remakeBudget = async (budgetId: string): Promise<boolean> => {
  const response = await httpClient.patch<boolean>(`${BASE_URL}/remake/${budgetId}`);
  return response.data;
};

export const completedBudget = async (budgetId: string): Promise<boolean> => {
  const response = await httpClient.patch<boolean>(`${BASE_URL}/completed/${budgetId}`);
  return response.data;
};

export const finishBudget = async (budgetId: string): Promise<boolean> => {
  const response = await httpClient.patch<boolean>(`${BASE_URL}/finish/${budgetId}`);
  return response.data;
};

export const getWhatsLink = async (os: string): Promise<TGetWhatsLinkResponse> => {
  const response = await httpClient.get<TGetWhatsLinkResponse>(`${BASE_URL}/link-whats/${os}`);
  return response.data;
};

export const observationUpdate = async ({
  budgetId,
  observation,
}: TObservationUpdateParams): Promise<boolean> => {
  const response = await httpClient.patch<boolean>(`${BASE_URL}/observation/${budgetId}`, {
    observation,
  });
  return response.data;
};
