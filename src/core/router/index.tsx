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

const router = createBrowserRouter([
  {
    Component: BodyApp,
    children: [
      {
        id: 'root',
        path: '',
        Component: Home,
      },
      {
        path: '*',
        Component: NotFoundRoute,
      },
      {
        path: 'logout',
        Component: Logout,
      },
      {
        path: 'cadastro',
        Component: RegisterProvider,
      },
      {
        path: 'prestador-servico',
        element: (
          <ProtectedRoute>
            <ServiceProvider />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'dashboard',
            Component: Dashboard,
          },
          {
            path: 'add-veiculo',
            Component: AddCar,
          },
          {
            path: 'orcamento',
            Component: Budget,
          },
        ],
      },
      {
        path: '/consulta',
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
