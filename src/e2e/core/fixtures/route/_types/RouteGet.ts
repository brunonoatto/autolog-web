import type { TMethodType, TRouteBase } from './index';

class RouteGet implements TRouteBase {
  route: string;
  method: TMethodType = 'GET';
  constructor(route: string) {
    this.route = route;
  }
}

export default RouteGet;
