import { useState } from 'react';

import { useStartServiceBudget } from '@core/service/budget';
import useBudgetViewContext from '@core/store/context/BudgetViewContext/useBudgetViewContext';
import { Button } from '@shared/design-system/ui/button';
import Modal from '@shared/design-system/ui/modal';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

export default function StartService() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigateCustom();
  const { mutate } = useStartServiceBudget();

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
      <Button icon="wrench" color="primary" onClick={handleSendForApproval}>
        Iniciar Serviço
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
