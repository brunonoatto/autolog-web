import { type Request } from '@playwright/test';

export type TMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export enum RouteMethodsEnum {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TMock = Record<string, any>;

export type TRouteBase = {
  route: string;
  method: TMethodType;
};

export type TMockData = {
  method: TMethodType;
  mock: TMock;
  status: number;
  conditionMock: (request?: Request, mock?: any) => boolean;
  mock2?: TMock;
};

export type TRouteMockData = {
  route: string;
  mocks: TMockData[];
};
