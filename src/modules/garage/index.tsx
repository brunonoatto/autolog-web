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
          title: 'Adicionar Orçamento',
          route: ROUTES_PATH.garageAddBudget,
        },
        {
          title: 'Orçamentos',
          route: ROUTES_PATH.garageBuggetSearch,
        },
        {
          title: 'Consultar Placa',
          route: ROUTES_PATH.garageConsultationLicense,
        },
      ]}
    >
      <Outlet />
    </BodyApp>
  );
}
