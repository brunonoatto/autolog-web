import RouteGet from '@e2e/core/fixtures/route/_types/RouteGet';
import RoutePost from '@e2e/core/fixtures/route/_types/RoutePost';

export const fipeBrandsRoute = new RouteGet('/fipe/api/v2/cars/brands');
export const fipeModelsMecaRoute = new RouteGet('/fipe/api/v2/cars/brands/39/models');

export const budgetPostAppRoute = new RoutePost('/budget');
