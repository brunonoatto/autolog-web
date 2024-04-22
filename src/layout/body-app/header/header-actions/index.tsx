import useAuth from '@core/store/context/hooks/useAuth';
import IconButton from '@shared/design-system/ui/icon-button';

const HeaderActions = () => {
  const { logout, getTokenData } = useAuth();

  const { name } = getTokenData() || {};

  return (
    <div className="flex gap-2">
      <div className="text-xs">
        <div>Usuário: </div>
        <div>{name}</div>
      </div>

      <IconButton icon="log-out" variant="ghost" size="icon" title="Sair" onClick={logout} />
    </div>
  );
};

export default HeaderActions;
