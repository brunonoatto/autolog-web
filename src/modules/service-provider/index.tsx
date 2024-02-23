import { Outlet } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import Menu from '@core/layout/menu';

const ServiceProvider = () => {
  return (
    <div className="md:h-full md:grid md:grid-cols-[15rem_auto]">
      <Menu
        menus={[
          {
            title: 'Dashboard',
            route: ROUTES_PATH.dashboard,
          },
          {
            title: 'Adicionar veiculo',
            route: ROUTES_PATH.addVeiculo,
          },
          {
            title: 'Orçamentos',
            route: ROUTES_PATH.orcamento,
          },
        ]}
      />
      <div className="md:overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default ServiceProvider;
