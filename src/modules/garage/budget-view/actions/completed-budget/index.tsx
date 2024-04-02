import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useCompletedBudget } from '@core/service/budget';
import type { TBudgetActionParams } from '@modules/garage/budget-view/actions/types';
import IconButton from '@shared/design-system/icon-button';
import Modal from '@shared/design-system/modal';

export default function CompletedService({ os }: TBudgetActionParams) {
  const navigate = useNavigate();
  const { mutate } = useCompletedBudget();
  const [openModal, setOpenModal] = useState(false);

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
        title="Carro enviado para iniciar o serviço!"
        confirmText="Continuar"
        onConfirmClick={handleGoToDashboard}
      />
    </>
  );
}
