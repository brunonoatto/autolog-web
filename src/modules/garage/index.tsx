import { CircleDollarSign, FileSearch2, Search, Trello } from 'lucide-react';

import BodyApp from '@layout/body-app';

export default function GarageContent() {
  return (
    <BodyApp
      menus={[
        {
          title: 'Dashboard',
          route: '/garage',
          icon: Trello,
        },
        {
          title: 'Adicionar Orçamento',
          route: '/garage/orcamento',
          icon: CircleDollarSign,
        },
        {
          title: 'Orçamentos',
          route: '/garage/orcamentos',
          icon: Search,
        },
        {
          title: 'Consultar Placa',
          route: '/garage/consulta-placa',
          icon: FileSearch2,
        },
      ]}
    />
  );
}
