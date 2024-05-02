import { useState } from 'react';

import { useRemakeBudget } from '@core/service/budget';
import useAuth from '@core/store/context/AuthContext/hook';
import useBudgetView from '@core/store/context/BudgetViewContext/useBudgetViewContext';
import IconButton from '@shared/design-system/ui/icon-button';
import Modal from '@shared/design-system/ui/modal';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

export default function RejectButton() {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const navigate = useNavigateCustom();
  const { isAuthenticated } = useAuth();
  const { mutate } = useRemakeBudget();

  const { budget } = useBudgetView();
  const { os = '' } = budget || {};

  const handleGoToBudgets = () => {
    if (isAuthenticated) {
      navigate('/cliente');
    } else {
      navigate('/orcamento-rejeitado');
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
      <IconButton
        icon="thumbs-down"
        variant="destructive"
        onClick={() => setOpenConfirmModal(true)}
      >
        Rejeitar orçamento
      </IconButton>

      <Modal
        open={openConfirmModal}
        title="Confirma a rejeição do orçamento?"
        confirmVariant="destructive"
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
