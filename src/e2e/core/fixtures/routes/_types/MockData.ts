import type { TMockData, TRouteBase } from './index';

class MockData implements TMockData {
  method: TMockData['method'];
  mock: TMockData['mock'];
  status: TMockData['status'] = 200;
  conditionMock: TMockData['conditionMock'] = () => true;
  mock2: TMockData['mock'] = {};

  constructor(base: TRouteBase, mock: TMockData['mock']) {
    this.method = base.method;
    this.mock = mock;
  }

  setStatus = (value: number) => {
    this.status = value;
    return this;
  };

  setConditionMock = (conditionMock: TMockData['conditionMock'], mock2: TMockData['mock']) => {
    this.conditionMock = conditionMock;
    this.mock2 = mock2;
    return this;
  };
}

export default MockData;
