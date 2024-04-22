import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useRemakeBudget } from '@core/service/budget';
import useBudgetView from '@core/store/context/hooks/useBudgetViewContext';
import IconButton from '@shared/design-system/ui/icon-button';
import Modal from '@shared/design-system/ui/modal';

export default function RemakeBudget() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { mutate } = useRemakeBudget();

  const { budget } = useBudgetView();
  const { os = '' } = budget || {};

  const handleGoToBudget = () => {
    navigate(`${ROUTES_PATH.garageBudgetView}/${os}`);
  };

  const handleGoToDashboard = () => {
    navigate(ROUTES_PATH.garageDashboard);
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
