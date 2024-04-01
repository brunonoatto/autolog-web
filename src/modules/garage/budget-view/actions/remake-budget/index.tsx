import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useRemakeBudget } from '@core/service/budget';
import IconButton from '@shared/design-system/icon-button';
import Modal from '@shared/design-system/modal';

type TSendForApprovalProps = { os: string };

export default function RemakeBudget({ os }: TSendForApprovalProps) {
  const navigate = useNavigate();
  const { mutate } = useRemakeBudget();
  const [openModal, setOpenModal] = useState(false);

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
      <IconButton icon="BudgetLoadingIcon" color="primary" onClick={handleRemake}>
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
