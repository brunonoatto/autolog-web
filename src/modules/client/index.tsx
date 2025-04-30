import { Car, FileSearch2, FolderInput, Receipt, Warehouse } from 'lucide-react';

import BodyApp from '@layout/body-app';

export default function ClientContent() {
  return (
    <BodyApp
      menus={[
        {
          title: 'Meus veículos',
          route: '/cliente',
          icon: Warehouse,
        },
        {
          title: 'Cadastrar veículo',
          route: '/cliente/cadastrar-veiculo',
          icon: Car,
        },
        {
          title: 'Orçamentos',
          route: '/cliente/orcamentos',
          icon: Receipt,
        },
        {
          title: 'Transferir veículo',
          route: '/cliente/transferir',
          icon: FolderInput,
        },
        {
          title: 'Consultar Placa',
          route: '/cliente/consulta-placa',
          icon: FileSearch2,
        },
      ]}
    />
  );
}
