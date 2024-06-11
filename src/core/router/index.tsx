import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SuspenseRoute from '@core/router/suspense-route';
import BigSpinner from '@layout/body-app/big-spinner';
import urlJoin from '@shared/helpers/string/urlJoin';

import { ROUTES_PATH } from './types';

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
const GarageBudgetAdd = lazy(() => import('@modules/garage/budget-add'));
const GarageBudgetSearch = lazy(() => import('@modules/garage/budget-search'));
const GarageBudgetView = lazy(() => import('@modules/garage/budget-view'));
const ClientContent = lazy(() => import('@modules/client'));
const ClientCarView = lazy(() => import('@modules/client/car-view'));
const ClientBudgetSearch = lazy(() => import('@modules/client/budget-search'));
const ClientBudgetView = lazy(() => import('@modules/client/budget-view'));
const ClientMyCars = lazy(() => import('@modules/client/my-cars'));
const ClientTransferCar = lazy(() => import('@modules/client/transfer-car'));
const ClientRegisterCar = lazy(() => import('@modules/client/register-car'));
const NotFoundRoute = lazy(() => import('@shared/components/not-found-route'));

const router = createBrowserRouter([
  {
    Component: SuspenseRoute,
    children: [
      {
        element: <ProtectedRoute isPrivate={false} />,
        children: [
          {
            id: 'login',
            path: ROUTES_PATH.login,
            Component: Login,
          },
          {
            path: urlJoin(ROUTES_PATH.budgetWithoutLogin, ':os'),
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
        ],
      },
      {
        element: <ProtectedRoute isPrivate routeUserType="Garage" />,
        children: [
          {
            path: ROUTES_PATH.garageHome,
            Component: GarageContent,
            children: [
              {
                index: true,
                Component: GarageDashboard,
              },
              {
                path: ROUTES_PATH.garageBudget,
                Component: GarageBudgetAdd,
              },
              {
                path: urlJoin(ROUTES_PATH.garageBudget, ':os'),
                Component: GarageBudgetView,
              },
              {
                path: ROUTES_PATH.garageBuggetSearch,
                Component: GarageBudgetSearch,
              },
              {
                path: ROUTES_PATH.garageConsultationLicense,
                Component: ConsultLicense,
              },
            ],
          },
        ],
      },
      {
        element: <ProtectedRoute isPrivate routeUserType="Client" />,
        children: [
          {
            path: ROUTES_PATH.clientHome,
            Component: ClientContent,
            children: [
              {
                index: true,
                Component: ClientMyCars,
              },
              {
                path: urlJoin(ROUTES_PATH.clientHome, ':license'),
                Component: ClientCarView,
              },
              {
                path: ROUTES_PATH.clientBudgets,
                Component: ClientBudgetSearch,
              },
              {
                path: urlJoin(ROUTES_PATH.clientBudgetView, ':os'),
                Component: ClientBudgetView,
              },
              {
                path: ROUTES_PATH.clientConsultationLicense,
                Component: ConsultLicense,
              },
              {
                path: ROUTES_PATH.clientTransfer,
                Component: ClientTransferCar,
              },
              {
                path: ROUTES_PATH.clientRegisterCar,
                Component: ClientRegisterCar,
              },
            ],
          },
        ],
      },
      {
        path: ROUTES_PATH.all,
        Component: NotFoundRoute,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} fallbackElement={<BigSpinner open={true} />} />;
};

export default Router;
