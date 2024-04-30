import type { TMethodType, TRouteBase } from './index';

class RoutePut implements TRouteBase {
  route: string;
  method: TMethodType = 'PUT';
  constructor(route: string) {
    this.route = route;
  }
}

export default RoutePut;
