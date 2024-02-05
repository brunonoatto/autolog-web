import { Outlet } from 'react-router-dom';

import Menu from '@core/layout/menu';

const ServiceProvider = () => {
  return (
    <div className="md:flex h-full">
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
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ServiceProvider;
