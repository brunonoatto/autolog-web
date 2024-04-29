import { TRoute } from '@core/router/consts';

import type { TMethodType, TRouteBase } from './index';

class RoutePost implements TRouteBase {
  route: string;
  method: TMethodType = 'POST';
  constructor(route: TRoute) {
    this.route = route;
  }
}

export default RoutePost;
