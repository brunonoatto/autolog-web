import { TRoute } from '@core/router/consts';

import type { TMethodType, TRouteBase } from './index';

class RouteGet implements TRouteBase {
  route: string;
  method: TMethodType = 'GET';
  constructor(route: TRoute) {
    this.route = route;
  }
}

export default RouteGet;
