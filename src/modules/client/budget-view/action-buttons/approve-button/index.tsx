import { useState } from 'react';

import { useApproveBudget } from '@core/service/budget';
import useAuth from '@core/store/context/hooks/useAuth';
import useBudgetView from '@core/store/context/hooks/useBudgetViewContext';
import IconButton from '@shared/design-system/ui/icon-button';
import Modal from '@shared/design-system/ui/modal';
import useNavigateApp from '@shared/hooks/useNavigateApp';

export default function ApproveButton() {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const navigate = useNavigateApp();
  const { isAuthenticated } = useAuth();
  const { mutate } = useApproveBudget();

  const { budget } = useBudgetView();
  const { os = '' } = budget || {};

  const handleGoToBudgets = () => {
    if (isAuthenticated) {
      navigate('/cliente');
    } else {
      navigate('/orcamento-aprovado');
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
      <IconButton icon="thumbs-up" onClick={() => setOpenConfirmModal(true)}>
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
