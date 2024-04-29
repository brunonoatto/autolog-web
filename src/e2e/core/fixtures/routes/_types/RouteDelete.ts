import { TRoute } from '@core/router/consts';

import type { TMethodType, TRouteBase } from './index';

class RouteDelete implements TRouteBase {
  route: string;
  method: TMethodType = 'DELETE';
  constructor(route: TRoute) {
    this.route = route;
  }
}

export default RouteDelete;
