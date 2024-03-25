import { Outlet } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import Menu from '@layout/menu';

export default function GarageHome() {
  return (
    <div className="md:h-full md:grid md:grid-cols-[15rem_auto]">
      <Menu
        menus={[
          {
            title: 'Dashboard',
            route: ROUTES_PATH.garageDashboard,
          },
          {
            title: 'Adicionar veiculo',
            route: ROUTES_PATH.addVeiculo,
          },
          {
            title: 'Orçamentos',
            route: ROUTES_PATH.buggetsSearch,
          },
        ]}
      />
      <div className="md:overflow-y-auto p-2 md:p-4">
        <Outlet />
      </div>
    </div>
  );
}
