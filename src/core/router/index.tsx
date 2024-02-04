import { createBrowserRouter } from 'react-router-dom';

import ErrorBoundary from '@shared/components/errorBoundary';
import ChoosePerfil from '@choose-perfil/index';
import ServiceProvider from '@service-provider/index';
import Dashboard from '@service-provider/dashboard';
import ConsultLicense from '@consult-license/index';
import AddCar from '@service-provider/add-car';
import Budget from '@service-provider/budget';

const router = createBrowserRouter([
  {
    path: '/',
    Component: ChoosePerfil,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/prestador-servico',
    Component: ServiceProvider,
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
]);

export default router;
