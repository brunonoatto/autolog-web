import { Outlet } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import Menu from '@layout/menu';

export default function ClientHome() {
  return (
    <div className="md:h-full md:grid md:grid-cols-[15rem_auto]">
      <Menu
        menus={[
          {
            title: 'Orçamentos',
            route: ROUTES_PATH.clientBudgetSearch,
          },
          {
            title: 'Transferir veiculo',
            route: ROUTES_PATH.clientTransfer,
          },
        ]}
      />
      <div className="md:overflow-y-auto p-2 md:p-4">
        <Outlet />
      </div>
    </div>
  );
}
