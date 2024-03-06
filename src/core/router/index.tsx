import { lazy } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ROUTES_PATH } from './consts';

const NotFoundRoute = lazy(() => import('@shared/components/not-found-route'));
const Home = lazy(() => import('@modules/home'));
const ServiceProvider = lazy(() => import('@modules/service-provider'));
const Dashboard = lazy(() => import('@modules/service-provider/dashboard'));
const ConsultLicense = lazy(() => import('@modules/consult-license/index'));
const AddCar = lazy(() => import('@modules/service-provider/add-car'));
const Budget = lazy(() => import('@modules/service-provider/budget'));
const RegisterProviderForm = lazy(() => import('@modules/register-provider-form'));
const BodyApp = lazy(() => import('@core/layout/body-app'));
const ProtectedRoute = lazy(() => import('./protected-route'));
const Logout = lazy(() => import('@core/auth/logout'));

const router = createBrowserRouter([
  {
    Component: BodyApp,
    children: [
      {
        id: 'root',
        path: ROUTES_PATH.root,
        Component: Home,
      },
      {
        path: ROUTES_PATH.all,
        Component: NotFoundRoute,
      },
      {
        path: ROUTES_PATH.logout,
        Component: Logout,
      },
      {
        path: ROUTES_PATH.cadastroPrestadorServico,
        Component: RegisterProviderForm,
      },
      {
        path: ROUTES_PATH.prestadorServico,
        element: (
          <ProtectedRoute>
            <ServiceProvider />
          </ProtectedRoute>
        ),
        children: [
          {
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
      {
        path: ROUTES_PATH.consultaPlaca,
        Component: ConsultLicense,
      },
    ],
  },
]);

type TRouterProps = { spinner: React.ReactNode };
const Router = ({ spinner }: TRouterProps) => {
  return <RouterProvider router={router} fallbackElement={spinner} />;
};

export default Router;
