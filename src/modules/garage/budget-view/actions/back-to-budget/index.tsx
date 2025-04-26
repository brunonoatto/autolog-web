import { useState } from 'react';

import { useRemakeBudget } from '@core/service/budget';
import useBudgetViewContext from '@core/store/context/BudgetViewContext/hook';
import { Button } from '@shared/design-system/ui/button';
import Modal from '@shared/design-system/ui/modal';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

export default function BackToBudget() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigateCustom();
  const { mutate } = useRemakeBudget();

  const { budget } = useBudgetViewContext();
  const { id = '' } = budget || {};

  const handleGoToDashboard = () => {
    navigate('/garage');
  };

  const handleSendForApproval = () => {
    mutate(id, {
      onSuccess: () => {
        setOpenModal(true);
      },
    });
  };

  return (
    <>
      <Button icon="corner-up-left" variant="outline" onClick={handleSendForApproval}>
        Voltar para realizar orçamento
      </Button>

      <Modal
        open={openModal}
        title="Veículo aguardando o Orçamento novamente!"
        confirmText="Continuar"
        onConfirmClick={handleGoToDashboard}
      />
    </>
  );
}
