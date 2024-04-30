import type { TMethodType, TRouteBase } from './index';

class RoutePost implements TRouteBase {
  route: string;
  method: TMethodType = 'POST';
  constructor(route: string) {
    this.route = route;
  }
}

export default RoutePost;
