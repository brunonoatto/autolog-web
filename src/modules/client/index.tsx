import BodyApp from '@layout/body-app';

export default function ClientContent() {
  return (
    <BodyApp
      menus={[
        {
          title: 'Meus veículos',
          route: '/cliente',
          icon: 'warehouse',
        },
        {
          title: 'Cadastrar veículo',
          route: '/cliente/cadastrar-veiculo',
          icon: 'car',
        },
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
          icon: 'file-search-2',
        },
      ]}
    />
  );
}
