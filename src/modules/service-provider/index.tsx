import Menu from '@shared/components/menu';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard';
import AddCar from './add-car';
import Budget from './budget';

const ServiceProvider = () => {
  return (
    <div className="md:flex">
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
      <Routes>
        <Route path="dashboard" Component={Dashboard} />
        <Route path="add-veiculo" Component={AddCar} />
        <Route path="orcamento" Component={Budget} />
      </Routes>
    </div>
  );
};

export default ServiceProvider;
