import { Request } from '@playwright/test';

export type TAssertCurrentUrl = {
  url: string;
  waitForNavigation?: boolean;
  checkEqual?: boolean;
  timeout?: number;
};

export type TWaitForUrl = {
  url: string;
  checkEqual?: boolean;
};

export type TListenerFunction = (request: Request) => void;
export type TListener = { url: string; listener: TListenerFunction };

export type TAssertBoolean = {
  selector: string;
  value?: boolean;
};
