import httpClient from '@core/api/http-client';

import type {
  TBudget,
  TBudgetCompleteResponse,
  TBudgetListItemResponse,
  TGetWhatsLinkResponse,
  TNewBudgetParams,
} from './types';

const BASE_URL = '/budget';

export const addBudget = async (data: TNewBudgetParams): Promise<TBudget> => {
  const response = await httpClient.post<TBudget>(BASE_URL, data);
  return response.data;
};

export const listBudgets = async (license: string | null): Promise<TBudgetListItemResponse[]> => {
  const response = await httpClient.get<TBudgetListItemResponse[]>(BASE_URL, {
    params: { license },
  });
  return response.data;
};

export const getBudget = async (os: string): Promise<TBudgetCompleteResponse> => {
  const response = await httpClient.get<TBudgetCompleteResponse>(`${BASE_URL}/${os}`);
  return response.data;
};

export const approveBudget = async (os: string): Promise<boolean> => {
  const response = await httpClient.patch<boolean>(`${BASE_URL}/approve/${os}`);
  return response.data;
};

export const sendForApproveBudget = async (os: string): Promise<boolean> => {
  const response = await httpClient.patch<boolean>(`${BASE_URL}/send-for-approve/${os}`);
  return response.data;
};

export const startServiceBudget = async (os: string): Promise<boolean> => {
  const response = await httpClient.patch<boolean>(`${BASE_URL}/start/${os}`);
  return response.data;
};

export const remakeBudget = async (os: string): Promise<boolean> => {
  const response = await httpClient.patch<boolean>(`${BASE_URL}/remake/${os}`);
  return response.data;
};

export const completedBudget = async (os: string): Promise<boolean> => {
  const response = await httpClient.patch<boolean>(`${BASE_URL}/completed/${os}`);
  return response.data;
};

export const finishBudget = async (os: string): Promise<boolean> => {
  const response = await httpClient.patch<boolean>(`${BASE_URL}/finish/${os}`);
  return response.data;
};

export const getWhatsLink = async (os: string): Promise<TGetWhatsLinkResponse> => {
  const response = await httpClient.get<TGetWhatsLinkResponse>(`${BASE_URL}/whats/${os}`);
  return response.data;
};
