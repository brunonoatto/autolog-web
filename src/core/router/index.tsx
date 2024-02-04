import { createBrowserRouter } from 'react-router-dom';

import NotFoundRoute from '@shared/components/not-found-route';
import ChoosePerfil from '@choose-perfil/index';
import ServiceProvider from '@service-provider/index';
import Dashboard from '@service-provider/dashboard';
import ConsultLicense from '@consult-license/index';
import AddCar from '@service-provider/add-car';
import Budget from '@service-provider/budget';
import RegisterProvider from 'src/modules/register-provider';
import BodyApp from '@core/layout/body-app';
import ProtectedRoute from './protected-route';

const router = createBrowserRouter([
  {
    Component: BodyApp,
    children: [
      {
        id: 'root',
        path: '/',
        Component: ChoosePerfil,
      },
      {
        path: '*',
        Component: NotFoundRoute,
      },
      {
        path: '/cadastro',
        Component: RegisterProvider,
      },
      {
        path: '/prestador-servico',
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

export default router;
