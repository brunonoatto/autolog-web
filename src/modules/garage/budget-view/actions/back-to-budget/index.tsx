import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useRemakeBudget } from '@core/service/budget';
import useBudgetView from '@core/store/context/hooks/useBudgetViewContext';
import IconButton from '@shared/design-system/icon-button';
import Modal from '@shared/design-system/modal';

export default function BackToBudget() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { mutate } = useRemakeBudget();

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
      <IconButton icon="BudgetLoadingIcon" color="secondary" onClick={handleSendForApproval}>
        Voltar para realizar orçamento
      </IconButton>

      <Modal
        open={openModal}
        title="Veículo aguardando o Orçamento novamente."
        confirmText="Continuar"
        onConfirmClick={handleGoToDashboard}
      />
    </>
  );
}
