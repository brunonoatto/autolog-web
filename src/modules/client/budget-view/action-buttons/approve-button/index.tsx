import { CheckCheck, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

import { useApproveBudget } from '@core/service/budget';
import { useAuth } from '@core/store/context/AuthContext';
import useBudgetViewContext from '@core/store/context/BudgetViewContext/hook';
import { Button } from '@shared/design-system/ui/button';
import Modal from '@shared/design-system/ui/modal';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

export default function ApproveButton() {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const navigate = useNavigateCustom();
  const { isAuthenticated } = useAuth();
  const { mutate } = useApproveBudget();

  const { budget } = useBudgetViewContext();
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
        handleGoToBudgets();
      },
    });
  };

  return (
    <>
      <Button icon={ThumbsUp} onClick={() => setOpenConfirmModal(true)}>
        Aprovar orçamento
      </Button>

      <Modal
        open={openConfirmModal}
        title="Confirma a aprovação do orçamento?"
        icon={CheckCheck}
        onConfirmClick={handleApproveBudget}
        onCancelClick={() => setOpenConfirmModal(false)}
      />
    </>
  );
}
