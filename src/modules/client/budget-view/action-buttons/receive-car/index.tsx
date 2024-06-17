import { useState } from 'react';

import { useFinishBudget } from '@core/service/budget';
import useBudgetViewContext from '@core/store/context/BudgetViewContext/useBudgetViewContext';
import { Button } from '@shared/design-system/ui/button';
import Modal from '@shared/design-system/ui/modal';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

export default function ReceiveButton() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigateCustom();
  const { mutate } = useFinishBudget();

  const { budget } = useBudgetViewContext();
  const { id = '' } = budget || {};

  const handleGoToBudgets = () => {
    navigate('/cliente');
  };

  const handleFinishBudget = () => {
    mutate(id, {
      onSuccess: () => {
        setOpenModal(true);
      },
    });
  };

  return (
    <>
      <Button icon="check-check" onClick={handleFinishBudget}>
        Veículo recebido
      </Button>

      <Modal
        open={openModal}
        title="Oba, ficamos felizes que recebeu seu veículo."
        confirmText="Continuar"
        onConfirmClick={handleGoToBudgets}
      />
    </>
  );
}
