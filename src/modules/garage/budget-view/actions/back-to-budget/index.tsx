import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useRemakeBudget } from '@core/service/budget';
import type { TBudgetActionParams } from '@modules/garage/budget-view/actions/types';
import IconButton from '@shared/design-system/icon-button';
import Modal from '@shared/design-system/modal';

export default function BackToBudget({ os }: TBudgetActionParams) {
  const navigate = useNavigate();
  const { mutate } = useRemakeBudget();
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
      <IconButton icon="BudgetLoadingIcon" color="primary" onClick={handleSendForApproval}>
        Voltar para realizar orçamento
      </IconButton>

      <Modal
        open={openModal}
        title="Carro aguardando o Orçamento novamente."
        confirmText="Continuar"
        onConfirmClick={handleGoToDashboard}
      />
    </>
  );
}
