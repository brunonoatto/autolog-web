import { type AxiosResponse } from 'axios';

import httpClient from '@core/api/HttpClient';
import type { TNewBudgetParams, TBudget, TGetBudgetResponse } from './types';

const BASE_URL = '/budget';

export const addBudget = async (data: TNewBudgetParams): Promise<AxiosResponse<TBudget>> => {
  const response = await httpClient.post<TBudget>(BASE_URL, data);
  return response;
};

export const listBudgets = async (license: string | null): Promise<AxiosResponse<TBudget[]>> => {
  const response = await httpClient.get<TBudget[]>(BASE_URL, { params: { license } });
  return response;
};

export const getBudget = async (os: string): Promise<AxiosResponse<TGetBudgetResponse>> => {
  const response = await httpClient.get<TGetBudgetResponse>(`${BASE_URL}/${os}`);
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
