import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useFinishBudget } from '@core/service/budget';
import useBudgetView from '@core/store/context/hooks/useBudgetViewContext';
import IconButton from '@shared/design-system/icon-button';
import Modal from '@shared/design-system/modal';

export default function ReceiveButton() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { mutate } = useFinishBudget();

  const { budget } = useBudgetView();
  const { os = '' } = budget || {};

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
