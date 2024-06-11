import MockData from './MockData';

import type { TMock, TMockData, TRouteBase, TRouteMockData } from './index';

class RouteData implements TRouteMockData {
  base: TRouteBase;
  route: string;
  mocks: MockData[] = [];

  constructor(base: TRouteBase, mock: TMock) {
    this.base = base;
    this.route = `**${base.route}`;
    this.mocks.push(new MockData(base, mock));
  }

  setStatus = (value: number) => {
    const lastIndex = this.mocks.length - 1;
    this.mocks[lastIndex].setStatus(value);
    return this;
  };

  setConditionMock = (conditionMock: TMockData['conditionMock'], mock2: TMock) => {
    const lastIndex = this.mocks.length - 1;
    this.mocks[lastIndex].setConditionMock(conditionMock, mock2);
    return this;
  };

  addMock = (base: TRouteBase, mock: TMock) => {
    this.mocks.push(new MockData(base, mock));
    return this;
  };
}

export default RouteData;
