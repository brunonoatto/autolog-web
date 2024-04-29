/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Request } from '@playwright/test';

export type TMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export enum RouteMethodsEnum {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

export type TRouteBase = {
  route: string;
  method: TMethodType;
};

export type TMockData = {
  method: TMethodType;
  mock: any;
  status: number;
  conditionMock: (request?: Request, mock?: any) => boolean;
  mock2?: any;
};

export type TRouteMockData = {
  route: string;
  mocks: TMockData[];
};
