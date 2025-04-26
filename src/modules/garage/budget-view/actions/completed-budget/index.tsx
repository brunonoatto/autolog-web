import { useState } from 'react';

import { useCompletedBudget } from '@core/service/budget';
import useBudgetViewContext from '@core/store/context/BudgetViewContext/hook';
import { Button } from '@shared/design-system/ui/button';
import Modal from '@shared/design-system/ui/modal';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

export default function CompletedService() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigateCustom();
  const { mutate } = useCompletedBudget();

  const { budget } = useBudgetViewContext();
  const { id = '' } = budget || {};

  const handleGoToDashboard = () => {
    navigate('/garage');
  };

  const handleSendForApproval = () => {
    mutate(id, {
      onSuccess: () => {
        setOpenModal(true);
      },
    });
  };

  return (
    <>
      <Button icon="receipt" color="primary" onClick={handleSendForApproval}>
        Finalizar serviço
      </Button>

      <Modal
        open={openModal}
        title="Veículo enviado para iniciar o serviço!"
        confirmText="Continuar"
        onConfirmClick={handleGoToDashboard}
      />
    </>
  );
}
