import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useApproveBudget } from '@core/service/budget';
import useAuth from '@core/store/context/hooks/useAuth';
import useGarageBudgetView from '@core/store/context/hooks/useGarageBudgetViewContext';
import IconButton from '@shared/design-system/icon-button';
import Modal from '@shared/design-system/modal';

export default function ApproveButton() {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { mutate } = useApproveBudget();

  const { budget } = useGarageBudgetView();
  const { os = '' } = budget || {};

  const handleGoToBudgets = () => {
    if (isAuthenticated) {
      navigate(ROUTES_PATH.clientBudgetSearch);
    } else {
      navigate(ROUTES_PATH.budgetRejectedWithoutLogin);
    }
  };

  const handleApproveBudget = () => {
    setOpenConfirmModal(false);

    mutate(os, {
      onSuccess: () => {
        setOpenSuccessModal(true);
      },
    });
  };

  return (
    <>
      <IconButton icon="ThumbUpIcon" onClick={() => setOpenConfirmModal(true)}>
        Aprovar orçamento
      </IconButton>

      <Modal
        open={openConfirmModal}
        title="Confirma a aprovação do orçamento?"
        onConfirmClick={handleApproveBudget}
        onCancelClick={() => setOpenConfirmModal(false)}
      />

      <Modal
        open={openSuccessModal}
        title="Orçamento aprovado com sucesso!"
        confirmText="Continuar"
        onConfirmClick={handleGoToBudgets}
      />
    </>
  );
}
