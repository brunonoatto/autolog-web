import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useRemakeBudget } from '@core/service/budget';
import useAuth from '@core/store/context/hooks/useAuth';
import useBudgetView from '@core/store/context/hooks/useBudgetViewContext';
import IconButton from '@shared/design-system/icon-button';
import Modal from '@shared/design-system/modal';

export default function RejectButton() {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { mutate } = useRemakeBudget();

  const { budget } = useBudgetView();
  const { os = '' } = budget || {};

  const handleGoToBudgets = () => {
    if (isAuthenticated) {
      navigate(ROUTES_PATH.clientBudgetSearch);
    } else {
      navigate(ROUTES_PATH.budgetRejectedWithoutLogin);
    }
  };

  const handleRejectBudget = () => {
    setOpenConfirmModal(false);

    mutate(os, {
      onSuccess: () => {
        setOpenSuccessModal(true);
      },
    });
  };

  return (
    <>
      <IconButton icon="ThumbDownIcon" color="cancel" onClick={() => setOpenConfirmModal(true)}>
        Rejeitar orçamento
      </IconButton>

      <Modal
        open={openConfirmModal}
        title="Confirma a rejeição do orçamento?"
        confirmColor="cancel"
        onConfirmClick={handleRejectBudget}
        onCancelClick={() => setOpenConfirmModal(false)}
      />

      <Modal
        open={openSuccessModal}
        title="Orçamento Rejeitado!"
        confirmText="Continuar"
        onConfirmClick={handleGoToBudgets}
      />
    </>
  );
}
