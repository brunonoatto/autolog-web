import { useState } from 'react';

import { useRemakeBudget } from '@core/service/budget';
import { useAuth } from '@core/store/context/AuthContext';
import useBudgetViewContext from '@core/store/context/BudgetViewContext/hook';
import { Button } from '@shared/design-system/ui/button';
import Modal from '@shared/design-system/ui/modal';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

export default function RejectButton() {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const navigate = useNavigateCustom();
  const { isAuthenticated } = useAuth();
  const { mutate } = useRemakeBudget();

  const { budget } = useBudgetViewContext();
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
        handleGoToBudgets();
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
        icon="thumbs-down"
        confirmVariant="destructive"
        onConfirmClick={handleRejectBudget}
        onCancelClick={() => setOpenConfirmModal(false)}
      />
    </>
  );
}
