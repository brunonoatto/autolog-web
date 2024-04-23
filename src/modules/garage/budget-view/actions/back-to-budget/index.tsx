import { useState } from 'react';

import { useRemakeBudget } from '@core/service/budget';
import useBudgetView from '@core/store/context/hooks/useBudgetViewContext';
import IconButton from '@shared/design-system/ui/icon-button';
import Modal from '@shared/design-system/ui/modal';
import useNavigateApp from '@shared/hooks/useNavigateApp';

export default function BackToBudget() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigateApp();
  const { mutate } = useRemakeBudget();

  const { budget } = useBudgetView();
  const { os = '' } = budget || {};

  const handleGoToDashboard = () => {
    navigate('/garage/dashboard');
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
      <IconButton icon="corner-up-left" variant="outline" onClick={handleSendForApproval}>
        Voltar para realizar orçamento
      </IconButton>

      <Modal
        open={openModal}
        title="Veículo aguardando o Orçamento novamente!"
        confirmText="Continuar"
        onConfirmClick={handleGoToDashboard}
      />
    </>
  );
}
