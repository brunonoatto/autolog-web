import { ROUTES_PATH } from '@core/router/consts';
import useAuth from '@core/store/context/hooks/useAuth';
import MenuContent from '@shared/design-system/menu-content';

const HeaderActions = () => {
  const { logout, getTokenData } = useAuth();

  return (
    <div>
      <MenuContent
        className="float-end"
        icon="ArrowDownLineIcon"
        items={[
          { route: ROUTES_PATH.consultaPlaca, title: 'Consultar Placa' },
          { onClick: () => logout(), title: 'Sair', dividerTop: true },
        ]}
      />
      <div className="text-xs">Usuário: {getTokenData().name}</div>
    </div>
  );
};

export default HeaderActions;
