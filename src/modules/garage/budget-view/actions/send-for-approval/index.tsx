import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ServiceApi } from '@core/api';
import { ROUTES_PATH } from '@core/router/consts';
import { useSendForApproveBudget } from '@core/service/budget';
import type { TBudgetActionParams } from '@modules/garage/budget-view/actions/types';
import IconButton from '@shared/design-system/icon-button';
import Modal from '@shared/design-system/modal';

export default function SendForApproval({ os }: TBudgetActionParams) {
  const navigate = useNavigate();
  const { mutate } = useSendForApproveBudget();
  const [openModal, setOpenModal] = useState(false);

  const handleGoToDashboard = () => {
    navigate(ROUTES_PATH.garageDashboard);
  };

  const handleSendWhatsApp = async () => {
    // TODO: pensar em um local compartilhado para guardar essa ação
    const { data } = await ServiceApi.BudgetApi.getWhatsLink(os);
    const { link } = data;

    link && window.open(link, '_blank')?.focus();

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
