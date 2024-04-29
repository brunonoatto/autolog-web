import RouteData from '@e2e/core/fixtures/routes/_types/RouteData';
import RoutePost from '@e2e/core/fixtures/routes/_types/RoutePost';
import { garageAccessTokenData } from '@e2e/core/shared/consts/auth';

// const expectGarageLoginData: TLoginParams = {
//   email: 'newgarage@garage.com',
//   password: 'senha123',
// };

const loginGarageSuccessRoute = new RoutePost(`/login`);
const garageSuccess = {
  accessToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(garageAccessTokenData))}.UtuZf-IxlwRF6YPGdQh0_RSM0ISAPMSoeIuEPfFDIBA`,
};
export const logingarageSuccessRouteData = new RouteData(loginGarageSuccessRoute, garageSuccess);
