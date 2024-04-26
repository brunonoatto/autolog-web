import { useState } from 'react';

import useAuth from '@core/store/context/hooks/useAuth';
import ThemeSwitcher from '@layout/body-app/header/header-actions/theme-switcher';
import IconButton from '@shared/design-system/ui/icon-button';
import Modal from '@shared/design-system/ui/modal';

const HeaderActions = () => {
  const [openModal, setOpenModal] = useState(false);
  const { logout, getTokenData } = useAuth();

  const { name } = getTokenData() || {};

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex gap-2">
      <div className="text-xs">
        <div>Usuário: </div>
        <div>{name}</div>
      </div>

      <ThemeSwitcher />

      <IconButton
        icon="log-out"
        variant="ghost"
        size="icon"
        title="Sair"
        onClick={() => setOpenModal(true)}
      />

      <Modal
        open={openModal}
        title="Sair do sistema"
        icon="log-out"
        confirmText="Sim"
        onConfirmClick={handleLogout}
        cancelText="Não"
        onCancelClick={() => setOpenModal(false)}
      >
        Você realmente deseja sair do sistema?
      </Modal>
    </div>
  );
};

export default HeaderActions;
