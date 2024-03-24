import { Suspense, lazy } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ROUTES_PATH } from './consts';
import BigSpinner from '@layout/body-app/big-spinner';

const BodyApp = lazy(() => import('@layout/body-app'));
const NotFoundRoute = lazy(() => import('@shared/components/not-found-route'));
const LandingPage = lazy(() => import('@modules/landing-page'));
const Client = lazy(() => import('@modules/client'));
const ClientRegister = lazy(() => import('@modules/client-register'));
const Garage = lazy(() => import('@modules/garage'));
const Dashboard = lazy(() => import('@modules/garage/dashboard'));
const ConsultLicense = lazy(() => import('@modules/consult-license/index'));
const AddCar = lazy(() => import('@modules/garage/add-car'));
const Budget = lazy(() => import('@modules/garage/budget'));
const GarageRegister = lazy(() => import('@modules/garage-register'));
const ProtectedRoute = lazy(() => import('./protected-route'));
const Login = lazy(() => import('@modules/auth/login'));

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
        element: <Login />,
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
    element: (
      <Suspense fallback={<BigSpinner open={true} />}>
        <ProtectedRoute isPrivate routeUserType="garage" />
      </Suspense>
    ),
    children: [
      {
        element: <BodyApp />,
        children: [
          {
            path: ROUTES_PATH.garageHome,
            element: <Garage />,
            children: [
              {
                index: true,
                path: `${ROUTES_PATH.dashboard}/:license?`,
                Component: Dashboard,
              },
              {
                path: ROUTES_PATH.addVeiculo,
                Component: AddCar,
              },
              {
                path: ROUTES_PATH.orcamento,
                Component: Budget,
              },
            ],
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
        element: <Client />,
        children: [
          {
            path: ROUTES_PATH.consultaPlaca,
            Component: ConsultLicense,
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
