import type { TMethodType, TRouteBase } from './index';

class RouteDelete implements TRouteBase {
  route: string;
  method: TMethodType = 'DELETE';
  constructor(route: string) {
    this.route = route;
  }
}

export default RouteDelete;
