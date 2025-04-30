import { Send } from 'lucide-react';
import { useState } from 'react';

import { useSendForApproveBudget } from '@core/service/budget';
import useBudgetViewContext from '@core/store/context/BudgetViewContext/hook';
import useSendWhatApp from '@modules/garage/budget-view/hooks/useSendWhatsApp';
import { Button } from '@shared/design-system/ui/button';
import Modal from '@shared/design-system/ui/modal';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

export default function SendForApproval() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigateCustom();
  const { mutate } = useSendForApproveBudget();
  const { sendWhatsApp } = useSendWhatApp();

  const { budget } = useBudgetViewContext();
  const { id = '' } = budget || {};

  const handleGoToDashboard = () => {
    navigate('/garage');
  };

  const handleSendWhatsApp = async () => {
    await sendWhatsApp(id);

    handleGoToDashboard();
  };

  const handleSendForApproval = async () => {
    mutate(id, {
      onSuccess: () => {
        setOpenModal(true);
      },
    });
  };

  return (
    <>
      <Button icon={Send} onClick={handleSendForApproval}>
        Enviar para aprovação
      </Button>

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
