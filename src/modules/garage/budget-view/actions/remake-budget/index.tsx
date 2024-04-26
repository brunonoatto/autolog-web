import { useState } from 'react';

import { useRemakeBudget } from '@core/service/budget';
import useBudgetView from '@core/store/context/hooks/useBudgetViewContext';
import IconButton from '@shared/design-system/ui/icon-button';
import Modal from '@shared/design-system/ui/modal';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

export default function RemakeBudget() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigateCustom();
  const { mutate } = useRemakeBudget();

  const { budget } = useBudgetView();
  const { os = '' } = budget || {};

  const handleGoToBudget = () => {
    navigate(['/garage/orcamento', os]);
  };

  const handleGoToDashboard = () => {
    navigate('/garage');
  };

  const handleRemake = () => {
    mutate(os, {
      onSuccess: () => {
        setOpenModal(true);
      },
    });
  };

  return (
    <>
      <IconButton icon="corner-up-left" color="primary" onClick={handleRemake}>
        Refazer Orçamento
      </IconButton>

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
