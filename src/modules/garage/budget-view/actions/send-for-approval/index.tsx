import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useSendForApproveBudget } from '@core/service/budget';
import IconButton from '@shared/design-system/icon-button';
import Modal from '@shared/design-system/modal';

type TSendForApprovalProps = { os: string };

export default function SendForApproval({ os }: TSendForApprovalProps) {
  const navigate = useNavigate();
  const { mutate } = useSendForApproveBudget();
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
      <IconButton icon="SendIcon" color="primary" onClick={handleSendForApproval}>
        Enviar para aprovação
      </IconButton>

      <Modal
        open={openModal}
        title="Orçamento enviado para Aprovação do cliente"
        confirmText="Continuar"
        onConfirmClick={handleGoToDashboard}
      />
    </>
  );
}
