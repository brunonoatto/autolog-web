import BodyApp from '@layout/body-app';

export default function ClientContent() {
  return (
    <BodyApp
      menus={[
        {
          title: 'Orçamentos',
          route: '/cliente/orcamentos',
          icon: 'receipt',
        },
        {
          title: 'Transferir veículo',
          route: '/cliente/transferir',
          icon: 'folder-input',
        },
        {
          title: 'Consultar Placa',
          route: '/cliente/consulta-placa',
          icon: 'car',
        },
      ]}
    />
  );
}
