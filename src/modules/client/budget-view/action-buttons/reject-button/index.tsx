import { useState } from 'react';

import { useRemakeBudget } from '@core/service/budget';
import useAuth from '@core/store/context/AuthContext/hook';
import useBudgetView from '@core/store/context/BudgetViewContext/useBudgetViewContext';
import { Button } from '@shared/design-system/ui/button';
import Modal from '@shared/design-system/ui/modal';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

export default function RejectButton() {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const navigate = useNavigateCustom();
  const { isAuthenticated } = useAuth();
  const { mutate } = useRemakeBudget();

  const { budget } = useBudgetView();
  const { id = '' } = budget || {};

  const handleGoToBudgets = () => {
    if (isAuthenticated) {
      navigate('/cliente');
    } else {
      navigate('/orcamento-rejeitado');
    }
  };

  const handleRejectBudget = () => {
    setOpenConfirmModal(false);

    mutate(id, {
      onSuccess: () => {
        setOpenSuccessModal(true);
      },
    });
  };

  return (
    <>
      <Button icon="thumbs-down" variant="destructive" onClick={() => setOpenConfirmModal(true)}>
        Rejeitar orçamento
      </Button>

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
