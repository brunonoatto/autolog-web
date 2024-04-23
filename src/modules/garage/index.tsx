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
          icon: 'trello',
        },
        {
          title: 'Adicionar Orçamento',
          route: ROUTES_PATH.garageAddBudget,
          icon: 'circle-dollar-sign',
        },
        {
          title: 'Orçamentos',
          route: ROUTES_PATH.garageBuggetSearch,
          icon: 'search',
        },
        {
          title: 'Consultar Placa',
          route: ROUTES_PATH.garageConsultationLicense,
          icon: 'car',
        },
      ]}
    >
      <Outlet />
    </BodyApp>
  );
}
