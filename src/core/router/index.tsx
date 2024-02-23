import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import NotFoundRoute from '@shared/components/not-found-route';
import Home from '@home/index';
import ServiceProvider from '@service-provider/index';
import Dashboard from '@service-provider/dashboard';
import ConsultLicense from '@consult-license/index';
import AddCar from '@service-provider/add-car';
import Budget from '@service-provider/budget';
import RegisterProvider from 'src/modules/register-provider';
import BodyApp from '@core/layout/body-app';
import ProtectedRoute from './protected-route';
import Logout from '@core/auth/logout';
import { ROUTES_PATH } from './consts';

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
        Component: RegisterProvider,
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
            path: ROUTES_PATH.dashboard,
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
