import { Route, Routes } from 'react-router-dom';

import Menu from '@core/layout/menu';
import Dashboard from './dashboard';
import AddCar from './add-car';
import Budget from './budget';

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
        <Routes>
          <Route path="dashboard" Component={Dashboard} />
          <Route path="add-veiculo" Component={AddCar} />
          <Route path="orcamento" Component={Budget} />
        </Routes>
      </div>
    </div>
  );
};

export default ServiceProvider;
