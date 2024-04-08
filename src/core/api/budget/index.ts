import type { AxiosResponse } from 'axios';

import httpClient from '@core/api/HttpClient';

import type {
  TBudget,
  TBudgetCompleteResponse,
  TBudgetListItemResponse,
  TGetWhatsLinkResponse,
  TNewBudgetParams,
} from './types';

const BASE_URL = '/budget';

export const addBudget = async (data: TNewBudgetParams): Promise<AxiosResponse<TBudget>> => {
  const response = await httpClient.post<TBudget>(BASE_URL, data);
  return response;
};

export const listBudgets = async (
  license: string | null,
): Promise<AxiosResponse<TBudgetListItemResponse[]>> => {
  const response = await httpClient.get<TBudgetListItemResponse[]>(BASE_URL, {
    params: { license },
  });
  return response;
};

export const getBudget = async (os: string): Promise<AxiosResponse<TBudgetCompleteResponse>> => {
  const response = await httpClient.get<TBudgetCompleteResponse>(`${BASE_URL}/${os}`);
  return response;
};

export const approveBudget = async (os: string): Promise<AxiosResponse<boolean>> => {
  const response = await httpClient.patch<boolean>(`${BASE_URL}/approve/${os}`);
  return response;
};

export const sendForApproveBudget = async (os: string): Promise<AxiosResponse<boolean>> => {
  const response = await httpClient.patch<boolean>(`${BASE_URL}/send-for-approve/${os}`);
  return response;
};

export const startServiceBudget = async (os: string): Promise<AxiosResponse<boolean>> => {
  const response = await httpClient.patch<boolean>(`${BASE_URL}/start/${os}`);
  return response;
};

export const remakeBudget = async (os: string): Promise<AxiosResponse<boolean>> => {
  const response = await httpClient.patch<boolean>(`${BASE_URL}/remake/${os}`);
  return response;
};

export const completedBudget = async (os: string): Promise<AxiosResponse<boolean>> => {
  const response = await httpClient.patch<boolean>(`${BASE_URL}/completed/${os}`);
  return response;
};

export const finishBudget = async (os: string): Promise<AxiosResponse<boolean>> => {
  const response = await httpClient.patch<boolean>(`${BASE_URL}/finish/${os}`);
  return response;
};

export const getWhatsLink = async (os: string): Promise<AxiosResponse<TGetWhatsLinkResponse>> => {
  const response = await httpClient.get<TGetWhatsLinkResponse>(`${BASE_URL}/whats/${os}`);
  return response;
};
