import { Outlet } from 'react-router-dom';

import Menu from '@core/layout/menu';

const ServiceProvider = () => {
  return (
    <div className="md:h-full md:grid md:grid-cols-[15rem_auto]">
      <Menu
        menus={[
          {
            title: 'Dashboard',
            route: 'dashboard',
          },
          {
            title: 'Adicionar Veículo',
            route: 'add-veiculo',
          },
          {
            title: 'Orçamentos',
            route: 'orcamento',
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
