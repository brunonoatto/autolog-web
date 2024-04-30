/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, type Page, type Request } from '@playwright/test';

import type {
  TAssertBoolean,
  TAssertCurrentUrl,
  TListener,
  TListenerFunction,
  TWaitForUrl,
} from '@e2e/core/fixtures/assert/_types';
import { RouteMethodsEnum, TMock, TRouteBase } from '@e2e/core/fixtures/route/_types';
import RouteData from '@e2e/core/fixtures/route/_types/RouteData';

class AssertUtils {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  private getUrlPathname = async () => {
    const pathname = await this.page.evaluate(() => window.location.pathname);
    return pathname;
  };

  assertRequestPayloadListener =
    (routeData: TRouteBase, expectedPayload: TMock): TListenerFunction =>
    (request: Request) => {
      const url = request.url();
      const requestMethod = request.method();
      const routeMethod = routeData.method;

      if (
        expectedPayload &&
        url.includes(routeData.route) &&
        requestMethod === routeMethod &&
        (requestMethod === RouteMethodsEnum.Post || requestMethod === RouteMethodsEnum.Put)
      ) {
        const postDataJson = request.postDataJSON();
        const debugData = { __URL: url, __METHOD: requestMethod };
        expect({ ...debugData, ...postDataJson }).toStrictEqual({
          ...debugData,
          ...expectedPayload,
        });
      }
    };

  assertRequestPayload = (routeData: TRouteBase, expectedPayload: TMock) => {
    const listener = this.assertRequestPayloadListener(routeData, expectedPayload);
    this.page.addListener('request', listener);
    return listener;
  };

  assertRequestPayloadList = (expectedPayloadsArray: Array<RouteData>) => {
    const listListeners = expectedPayloadsArray.map<TListener>(({ base, mocks }) => ({
      url: base.route,
      listener: this.assertRequestPayload(base, mocks[0].mock),
    }));
    return listListeners;
  };

  // TODO: melhoria: fazer essa função retornar um TListener para não precisar criar na mão quando retorna
  reassertRequestPayload = (
    routeData: TRouteBase,
    expectedPayload: any,
    listeners?: TListener[],
  ) => {
    const listener = listeners?.find((item) => item.url === routeData.route)?.listener;
    if (listener) {
      this.page.removeListener('request', listener);
    }

    return this.assertRequestPayload(routeData, expectedPayload);
  };

  removeRouteListener = (route: string, listeners: TListener[]) => {
    const listenerToRemove = listeners.find(({ url }) => url === route)?.listener;
    if (listenerToRemove) this.page.removeListener('request', listenerToRemove);
  };

  assertRequestPayloads = (expectPayloadParam: string[] = []) => {
    const expects = (request: Request, expectPayload: any) => {
      const url = request.url();
      const payload = expectPayload.find((p: any) => url.includes(p.route));
      if (payload) {
        const { expectData, route } = payload;
        const postDataJson = request.postDataJSON();

        expect({ route, ...postDataJson }).toMatchObject({ route, ...expectData });
      }
    };

    const expectFunc = (request: Request) => {
      expects(request, expectPayloadParam);
    };

    this.page.on('request', expectFunc);

    return expectFunc;
  };

  assertNotHaveRequests = (routes: TRouteBase[] = []) => {
    const expects = (request: Request) => {
      const url = request.url();
      const madeRequest = routes.find(({ route }) => url.includes(route));
      expect(!!madeRequest).toBeFalsy();
    };

    this.page.on('request', (request) => expects(request));
  };

  cleanRoute = (route: string): string => {
    const routeHasAsterisco = route.includes('*');

    if (routeHasAsterisco) {
      const routeFinalPart = route.substring(route.lastIndexOf('/') + 1);
      const routeSemAsteriscos = routeFinalPart.replace(/\*/g, '');
      return routeSemAsteriscos;
    }

    return route;
  };

  getRequestsMade = async (array: any[] = []) => {
    const add = (request: Request) => {
      array.push(request.url());
    };
    this.page.on('request', (request) => add(request));
  };

  assertRequestsMade = (madeRequests: string[], routes: string[] = []) => {
    routes.forEach((route) => {
      const routeCleared = this.cleanRoute(route);
      const foundRequest = madeRequests.find((request) => request.includes(routeCleared));
      expect(!!foundRequest).toBeTruthy();
    });
  };

  assertRequestsNotMade = (madeRequests: string[], routes: string[] = []) => {
    routes.forEach((route) => {
      const routeCleared = this.cleanRoute(route);
      const foundRequest = madeRequests.find((request) => request.includes(routeCleared));
      expect(!!foundRequest).toBeFalsy();
    });
  };

  assertCurrentUrl = async (config: TAssertCurrentUrl) => {
    const { url, waitForNavigation = true, checkEqual = true, timeout = 200 } = config;
    if (waitForNavigation) {
      await this.page.waitForNavigation({ waitUntil: 'networkidle' });
    } else {
      await this.page.waitForTimeout(timeout);
    }

    const urlPathname = await this.getUrlPathname();

    if (checkEqual) {
      expect(urlPathname).toStrictEqual(url);
    } else {
      expect(urlPathname).toContain(url);
    }
  };

  waitForUrl = async (config: TWaitForUrl) => {
    const { url, checkEqual = true } = config;

    await this.page.waitForURL(`**${url}`);

    const urlPathname = await this.getUrlPathname();
    if (checkEqual) {
      expect(urlPathname).toStrictEqual(url);
    } else {
      expect(urlPathname).toContain(url);
    }
  };

  assertDisabledElement = async ({ selector, value = true }: TAssertBoolean) => {
    const isDisabled = await this.page.locator(selector).isDisabled();
    expect(isDisabled).toBe(value);
  };

  assertCheckedElement = async ({ selector, value = true }: TAssertBoolean) => {
    const isChecked = await this.page.locator(selector).isChecked();
    expect(isChecked).toBe(value);
  };
}

export default AssertUtils;
