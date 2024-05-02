import { useState } from 'react';

import { useCompletedBudget } from '@core/service/budget';
import useBudgetView from '@core/store/context/BudgetViewContext/useBudgetViewContext';
import IconButton from '@shared/design-system/ui/icon-button';
import Modal from '@shared/design-system/ui/modal';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

export default function CompletedService() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigateCustom();
  const { mutate } = useCompletedBudget();

  const { budget } = useBudgetView();
  const { os = '' } = budget || {};

  const handleGoToDashboard = () => {
    navigate('/garage');
  };

  const handleSendForApproval = () => {
    mutate(os, {
      onSuccess: () => {
        setOpenModal(true);
      },
    });
  };

  return (
    <>
      <IconButton icon="receipt" color="primary" onClick={handleSendForApproval}>
        Finalizar serviço
      </IconButton>

      <Modal
        open={openModal}
        title="Veículo enviado para iniciar o serviço!"
        confirmText="Continuar"
        onConfirmClick={handleGoToDashboard}
      />
    </>
  );
}
