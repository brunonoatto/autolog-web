import BodyApp from '@layout/body-app';

export default function GarageContent() {
  return (
    <BodyApp
      menus={[
        {
          title: 'Dashboard',
          route: '/garage/dashboard',
          icon: 'trello',
        },
        {
          title: 'Adicionar Orçamento',
          route: '/garage/orcamento',
          icon: 'circle-dollar-sign',
        },
        {
          title: 'Orçamentos',
          route: '/garage/orcamentos',
          icon: 'search',
        },
        {
          title: 'Consultar Placa',
          route: '/garage/consulta-placa',
          icon: 'car',
        },
      ]}
    />
  );
}
