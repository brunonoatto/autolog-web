import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useCompletedBudget } from '@core/service/budget';
import useBudgetView from '@core/store/context/hooks/useBudgetViewContext';
import IconButton from '@shared/design-system/icon-button';
import Modal from '@shared/design-system/modal';

export default function CompletedService() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { mutate } = useCompletedBudget();

  const { budget } = useBudgetView();
  const { os = '' } = budget || {};

  const handleGoToDashboard = () => {
    navigate(ROUTES_PATH.garageDashboard);
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
      <IconButton icon="CarDoneIcon" color="primary" onClick={handleSendForApproval}>
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
