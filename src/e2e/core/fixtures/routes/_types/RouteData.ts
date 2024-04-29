import MockData from './MockData';

import type { TMockData, TRouteBase, TRouteMockData } from './index';

class RouteData implements TRouteMockData {
  route: string;
  mocks: MockData[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(base: TRouteBase, mock: any) {
    this.route = `**/api${base.route}`;
    this.mocks.push(new MockData(base, mock));
  }

  setStatus = (value: number) => {
    const lastIndex = this.mocks.length - 1;
    this.mocks[lastIndex].setStatus(value);
    return this;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setConditionMock = (conditionMock: TMockData['conditionMock'], mock2: any) => {
    const lastIndex = this.mocks.length - 1;
    this.mocks[lastIndex].setConditionMock(conditionMock, mock2);
    return this;
  };

  addMock = (base: TRouteBase, mock: any) => {
    this.mocks.push(new MockData(base, mock));
    return this;
  };
}

export default RouteData;
