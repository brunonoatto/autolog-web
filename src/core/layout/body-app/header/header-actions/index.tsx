import { useAuthStore } from '@core/store/hooks';
import MenuContent from '@shared/components/menu-content';

const HeaderActions = () => {
  const username = useAuthStore((props) => props.username);

  return (
    <div>
      <MenuContent
        className="float-end"
        items={[
          { route: 'consulta', title: 'Consultar Placa' },
          { route: 'logout', title: 'Sair', dividerTop: true },
        ]}
      />
      <div className="text-xs">Usuário: {username}</div>
    </div>
  );
};

export default HeaderActions;
