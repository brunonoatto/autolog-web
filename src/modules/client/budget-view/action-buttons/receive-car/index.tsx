import { useState } from 'react';

import { useFinishBudget } from '@core/service/budget';
import useBudgetView from '@core/store/context/BudgetViewContext/useBudgetViewContext';
import IconButton from '@shared/design-system/ui/icon-button';
import Modal from '@shared/design-system/ui/modal';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

export default function ReceiveButton() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigateCustom();
  const { mutate } = useFinishBudget();

  const { budget } = useBudgetView();
  const { os = '' } = budget || {};

  const handleGoToBudgets = () => {
    navigate('/cliente');
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
      <IconButton icon="check-check" onClick={handleRejectBudget}>
        Veículo recebido
      </IconButton>

      <Modal
        open={openModal}
        title="Oba, ficamos felizes que recebeu seu veículo."
        confirmText="Continuar"
        onConfirmClick={handleGoToBudgets}
      />
    </>
  );
}
