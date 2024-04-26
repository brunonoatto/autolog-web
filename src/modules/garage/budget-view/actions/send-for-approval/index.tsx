import { useState } from 'react';

import { useSendForApproveBudget } from '@core/service/budget';
import useBudgetView from '@core/store/context/hooks/useBudgetViewContext';
import useSendWhatApp from '@modules/garage/budget-view/hooks/useSendWhatsApp';
import IconButton from '@shared/design-system/ui/icon-button';
import Modal from '@shared/design-system/ui/modal';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

export default function SendForApproval() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigateCustom();
  const { mutate } = useSendForApproveBudget();
  const { sendWhatsApp } = useSendWhatApp();

  const { budget } = useBudgetView();
  const { os = '' } = budget || {};

  const handleGoToDashboard = () => {
    navigate('/garage');
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
      <IconButton icon="send" onClick={handleSendForApproval}>
        Enviar para aprovação
      </IconButton>

      <Modal
        open={openModal}
        title="Orçamento enviado para Aprovação do cliente!"
        confirmText="Continuar"
        onConfirmClick={handleGoToDashboard}
        cancelText="Enviar WhatsApp e Continuar"
        onCancelClick={handleSendWhatsApp}
      />
    </>
  );
}
