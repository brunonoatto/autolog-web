import { Outlet } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import BodyApp from '@layout/body-app';

export default function ClientContent() {
  return (
    <BodyApp
      menus={[
        {
          title: 'Orçamentos',
          route: ROUTES_PATH.clientBudgetSearch,
          icon: 'receipt',
        },
        {
          title: 'Transferir veículo',
          route: ROUTES_PATH.clientTransfer,
          icon: 'folder-input',
        },
        {
          title: 'Consultar Placa',
          route: ROUTES_PATH.clientConsultationLicense,
          icon: 'car',
        },
      ]}
    >
      <Outlet />
    </BodyApp>
  );
}
