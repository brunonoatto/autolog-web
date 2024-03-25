import { ROUTES_PATH } from '@core/router/consts';
import useAuth from '@core/store/context/hooks/useAuth';
import MenuContent from '@shared/design-system/menu-content';

const HeaderActions = () => {
  const { logout, getTokenData } = useAuth();

  return (
    <div className="flex gap-2">
      <div className="text-xs">
        <div>Usuário: </div>
        <div>{getTokenData().name}</div>
      </div>

      <MenuContent
        icon="ArrowDownLineIcon"
        items={[
          { route: ROUTES_PATH.consultaPlaca, title: 'Consultar Placa' },
          { onClick: () => logout(), title: 'Sair', dividerTop: true },
        ]}
      />
    </div>
  );
};

export default HeaderActions;
