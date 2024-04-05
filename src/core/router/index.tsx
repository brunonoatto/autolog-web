import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import BigSpinner from '@layout/body-app/big-spinner';

import { ROUTES_PATH } from './consts';

const ProtectedRoute = lazy(() => import('./protected-route'));
const Login = lazy(() => import('@modules/auth/login'));
const BudgetApproved = lazy(() => import('@modules/without-login/budget-approved'));
const BudgetRejected = lazy(() => import('@modules/without-login/budget-rejected'));
const LandingPage = lazy(() => import('@modules/landing-page'));
const GarageRegister = lazy(() => import('@modules/garage-register'));
const ClientRegister = lazy(() => import('@modules/client-register'));
const ConsultLicense = lazy(() => import('@modules/consult-license/index'));
const GarageContent = lazy(() => import('@modules/garage'));
const GarageDashboard = lazy(() => import('@modules/garage/dashboard'));
const GarageAddCar = lazy(() => import('@modules/garage/add-car'));
const GarageBudgetSearch = lazy(() => import('@modules/garage/budget-search'));
const GarageBudgetView = lazy(() => import('@modules/garage/budget-view'));
const ClientContent = lazy(() => import('@modules/client'));
const ClientBudgetSearch = lazy(() => import('@modules/client/budget-search'));
const ClientBudgetView = lazy(() => import('@modules/client/budget-view'));
const ClientTransferCar = lazy(() => import('@modules/client/transfer-car'));
const NotFoundRoute = lazy(() => import('@shared/components/not-found-route'));

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<BigSpinner open={true} />}>
        <ProtectedRoute isPrivate={false} />
      </Suspense>
    ),
    children: [
      {
        id: 'login',
        path: ROUTES_PATH.login,
        Component: Login,
      },
      {
        path: `${ROUTES_PATH.budgetWithoutLogin}/:os`,
        Component: ClientBudgetView,
      },
      {
        path: ROUTES_PATH.budgetApprovedWithoutLogin,
        Component: BudgetApproved,
      },
      {
        path: ROUTES_PATH.budgetRejectedWithoutLogin,
        Component: BudgetRejected,
      },
      {
        id: 'root',
        path: ROUTES_PATH.landingPage,
        Component: LandingPage,
      },
      {
        path: ROUTES_PATH.garageRegister,
        Component: GarageRegister,
      },
      {
        path: ROUTES_PATH.clientRegister,
        Component: ClientRegister,
      },
      {
        path: ROUTES_PATH.consultaPlaca,
        Component: ConsultLicense,
      },
    ],
  },
  {
    element: (
      <Suspense fallback={<BigSpinner open={true} />}>
        <ProtectedRoute isPrivate routeUserType="garage" />
      </Suspense>
    ),
    children: [
      {
        path: ROUTES_PATH.garageHome,
        Component: GarageContent,
        children: [
          {
            index: true,
            path: `${ROUTES_PATH.garageDashboard}/:license?`,
            Component: GarageDashboard,
          },
          {
            path: ROUTES_PATH.garageAddVeiculo,
            Component: GarageAddCar,
          },
          {
            path: `${ROUTES_PATH.garageBudgetView}/:os?`,
            Component: GarageBudgetView,
          },
          {
            path: ROUTES_PATH.garageBuggetSearch,
            Component: GarageBudgetSearch,
          },
        ],
      },
    ],
  },
  {
    element: (
      <Suspense fallback={<BigSpinner open={true} />}>
        <ProtectedRoute isPrivate routeUserType="client" />
      </Suspense>
    ),
    children: [
      {
        path: ROUTES_PATH.clientHome,
        Component: ClientContent,
        children: [
          {
            path: ROUTES_PATH.clientBudgetSearch,
            Component: ClientBudgetSearch,
          },
          {
            path: `${ROUTES_PATH.clientBudgetView}/:os?`,
            Component: ClientBudgetView,
          },
          {
            path: ROUTES_PATH.clientTransfer,
            Component: ClientTransferCar,
          },
        ],
      },
    ],
  },
  {
    path: ROUTES_PATH.all,
    Component: NotFoundRoute,
  },
]);

const Router = () => {
  return <RouterProvider router={router} fallbackElement={<BigSpinner open={true} />} />;
};

export default Router;
