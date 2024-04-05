import { Outlet } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import BodyApp from '@layout/body-app';

export default function GarageContent() {
  return (
    <BodyApp
      menus={[
        {
          title: 'Dashboard',
          route: ROUTES_PATH.garageDashboard,
        },
        {
          title: 'Adicionar veiculo',
          route: ROUTES_PATH.garageAddVeiculo,
        },
        {
          title: 'Orçamentos',
          route: ROUTES_PATH.garageBuggetSearch,
        },
      ]}
    >
      <Outlet />
    </BodyApp>
  );
}
