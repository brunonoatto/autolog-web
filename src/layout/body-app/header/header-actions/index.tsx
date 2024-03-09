import { ROUTES_PATH } from '@core/router/consts';
import { useAuthStore } from '@core/store/hooks';
import MenuContent from '@shared/design-system/menu-content';

const HeaderActions = () => {
  const garage = useAuthStore((props) => props.garage);

  return (
    <div>
      <MenuContent
        className="float-end"
        items={[
          { route: ROUTES_PATH.consultaPlaca, title: 'Consultar Placa' },
          { route: ROUTES_PATH.logout, title: 'Sair', dividerTop: true },
        ]}
      />
      <div className="text-xs">Usuário: {garage?.email}</div>
    </div>
  );
};

export default HeaderActions;
