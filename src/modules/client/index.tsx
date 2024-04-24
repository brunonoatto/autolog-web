import BodyApp from '@layout/body-app';

export default function ClientContent() {
  return (
    <BodyApp
      menus={[
        {
          title: 'Orçamentos',
          route: '/cliente',
          icon: 'receipt',
        },
        {
          title: 'Cadastrar veículo',
          route: '/cliente/cadastrar-veiculo',
          icon: 'car',
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
