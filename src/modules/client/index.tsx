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
        },
        {
          title: 'Transferir veiculo',
          route: ROUTES_PATH.clientTransfer,
        },
        {
          title: 'Consultar Placa',
          route: ROUTES_PATH.clientConsultationLicense,
        },
      ]}
    >
      <Outlet />
    </BodyApp>
  );
}
