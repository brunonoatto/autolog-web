import { useState } from 'react';

import { useApproveBudget } from '@core/service/budget';
import useAuth from '@core/store/context/AuthContext/hook';
import useBudgetView from '@core/store/context/BudgetViewContext/useBudgetViewContext';
import { Button } from '@shared/design-system/ui/button';
import Modal from '@shared/design-system/ui/modal';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

export default function ApproveButton() {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const navigate = useNavigateCustom();
  const { isAuthenticated } = useAuth();
  const { mutate } = useApproveBudget();

  const { budget } = useBudgetView();
  const { id = '' } = budget || {};

  const handleGoToBudgets = () => {
    if (isAuthenticated) {
      navigate('/cliente');
    } else {
      navigate('/orcamento-aprovado');
    }
  };

  const handleApproveBudget = () => {
    setOpenConfirmModal(false);

    mutate(id, {
      onSuccess: () => {
        setOpenSuccessModal(true);
      },
    });
  };

  return (
    <>
      <Button icon="thumbs-up" onClick={() => setOpenConfirmModal(true)}>
        Aprovar orçamento
      </Button>

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
