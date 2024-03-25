import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useStartServiceBudget } from '@core/service/budget';
import IconButton from '@shared/design-system/icon-button';
import Modal from '@shared/design-system/modal';

type TSendForApprovalProps = { os: string };

export default function StartService({ os }: TSendForApprovalProps) {
  const navigate = useNavigate();
  const { mutate } = useStartServiceBudget();
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
      <IconButton icon="ProgressWrenchIcon" color="primary" onClick={handleSendForApproval}>
        Iniciar Serviço
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
