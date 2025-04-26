import type { Page } from '@playwright/test';

import RouteData from '@e2e/core/fixtures/route/_types/RouteData';

class RouteUtils {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async mockRouteResponse(mock: RouteData) {
    return this.page.route(mock.route, (route, request) => {
      const requestMethod = request.method();
      mock.mocks.forEach((item) => {
        if (requestMethod === item.method) {
          route.fulfill({
            headers: { 'access-control-allow-origin': '*' },
            status: item.status,
            body: JSON.stringify(item.conditionMock(request) ? item.mock : item.mock2),
          });
        }
      });
    });
  }

  async mockRouteResponseList(mocks: RouteData[]) {
    const mocksGroupedByRoute: RouteData[] = [];
    mocks.forEach((mock) => {
      const currentMock = mocksGroupedByRoute.find(({ route }) => route === mock.route);

      if (currentMock) {
        currentMock.mocks = currentMock.mocks.concat(mock.mocks);
      } else {
        mocksGroupedByRoute.push(mock);
      }
    });

    const mocksPromises = mocksGroupedByRoute.map((mock) => this.mockRouteResponse(mock));
    await Promise.all(mocksPromises);
  }

  async clearRoutes(routeList: string[]) {
    for (let i = 0; i < routeList.length; i += 1) {
      await this.page.unroute(routeList[i]);
    }
  }

  async remockRoute(route: RouteData) {
    await this.clearRoutes([route.route]);
    await this.mockRouteResponse(route);
  }

  async remockRoutes(routes: RouteData[]) {
    await this.clearRoutes(routes.map(({ route }) => route));
    await this.mockRouteResponseList(routes);
  }
}

export default RouteUtils;
