import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useSendForApproveBudget } from '@core/service/budget';
import useBudgetView from '@core/store/context/hooks/useBudgetViewContext';
import useSendWhatApp from '@modules/garage/budget-view/hooks/useSendWhatsApp';
import IconButton from '@shared/design-system_old/icon-button';
import Modal from '@shared/design-system_old/modal';

export default function SendForApproval() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { mutate } = useSendForApproveBudget();
  const { sendWhatsApp } = useSendWhatApp();

  const { budget } = useBudgetView();
  const { os = '' } = budget || {};

  const handleGoToDashboard = () => {
    navigate(ROUTES_PATH.garageDashboard);
  };

  const handleSendWhatsApp = async () => {
    await sendWhatsApp(os);

    handleGoToDashboard();
  };

  const handleSendForApproval = async () => {
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
        cancelText="Enviar WhatsApp e Continuar"
        onCancelClick={handleSendWhatsApp}
      />
    </>
  );
}
