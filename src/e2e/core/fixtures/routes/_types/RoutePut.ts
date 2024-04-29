import { TRoute } from '@core/router/consts';

import type { TMethodType, TRouteBase } from './index';

class RoutePut implements TRouteBase {
  route: string;
  method: TMethodType = 'PUT';
  constructor(route: TRoute) {
    this.route = route;
  }
}

export default RoutePut;
