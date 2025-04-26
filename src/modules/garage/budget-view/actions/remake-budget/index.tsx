import { useState } from 'react';

import { useRemakeBudget } from '@core/service/budget';
import useBudgetViewContext from '@core/store/context/BudgetViewContext/hook';
import { Button } from '@shared/design-system/ui/button';
import Modal from '@shared/design-system/ui/modal';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

export default function RemakeBudget() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigateCustom();
  const { mutate } = useRemakeBudget();

  const { budget } = useBudgetViewContext();
  const { id = '', os = '' } = budget || {};

  const handleGoToBudget = () => {
    navigate(['/garage/orcamento', os]);
  };

  const handleGoToDashboard = () => {
    navigate('/garage');
  };

  const handleRemake = () => {
    mutate(id, {
      onSuccess: () => {
        setOpenModal(true);
      },
    });
  };

  return (
    <>
      <Button icon="corner-up-left" color="primary" onClick={handleRemake}>
        Refazer Orçamento
      </Button>

      <Modal
        open={openModal}
        title="Orçamento enviado para Realizando Orçamento!"
        confirmText="Sim"
        onConfirmClick={handleGoToBudget}
        cancelText="Não"
        onCancelClick={handleGoToDashboard}
      >
        Deseja ir para o orçamento do veículo?
      </Modal>
    </>
  );
}
