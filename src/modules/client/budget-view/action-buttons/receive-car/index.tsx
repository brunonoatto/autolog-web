import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useFinishBudget } from '@core/service/budget';
import type { TActionButtonProps } from '@modules/client/budget-view/action-buttons/types';
import IconButton from '@shared/design-system/icon-button';
import Modal from '@shared/design-system/modal';

export default function ReceiveButton({ os }: TActionButtonProps) {
  const navigate = useNavigate();
  const { mutate } = useFinishBudget();
  const [openModal, setOpenModal] = useState(false);

  const handleGoToBudgets = () => {
    navigate(ROUTES_PATH.clientBudgetSearch);
  };

  const handleRejectBudget = () => {
    mutate(os, {
      onSuccess: () => {
        setOpenModal(true);
      },
    });
  };

  return (
    <>
      <IconButton icon="CarDoneIcon" onClick={handleRejectBudget}>
        Carro recebido
      </IconButton>

      <Modal
        open={openModal}
        title="Oba, ficamos felizes que recebeu seu carro."
        confirmText="Continuar"
        onConfirmClick={handleGoToBudgets}
      />
    </>
  );
}
