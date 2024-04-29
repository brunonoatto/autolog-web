import RouteData from '@e2e/core/fixtures/routes/_types/RouteData';
import { clientAccessToken, garageAccessToken } from '@e2e/core/shared/consts/auth';
import RoutesData from '@e2e/shared/routes.ts';

const loginGarageResponse = {
  accessToken: garageAccessToken,
};
export const loginGarageRouteData = new RouteData(RoutesData.Auth.login, loginGarageResponse);

const loginClientResponse = {
  accessToken: clientAccessToken,
};
export const loginClientRouteData = new RouteData(RoutesData.Auth.login, loginClientResponse);
