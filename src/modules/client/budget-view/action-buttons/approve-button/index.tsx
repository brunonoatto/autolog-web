import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useApproveBudget } from '@core/service/budget';
import IconButton from '@shared/design-system/icon-button';
import Modal from '@shared/design-system/modal';

type TApproveButtonProps = {
  os: string;
};

export default function ApproveButton({ os }: TApproveButtonProps) {
  const navigate = useNavigate();
  const { mutate } = useApproveBudget();
  const [openModal, setOpenModal] = useState(false);

  const handleGoToBudgets = () => {
    navigate(ROUTES_PATH.clientBudgetSearch);
  };

  const handleApproveBudget = () => {
    mutate(os, {
      onSuccess: () => {
        setOpenModal(true);
      },
    });
  };

  return (
    <>
      <IconButton icon="ThumbUpIcon" onClick={handleApproveBudget}>
        Aprovar orçamento
      </IconButton>

      <Modal
        open={openModal}
        title="Orçamento aprovado!"
        confirmText="Continuar"
        onConfirmClick={handleGoToBudgets}
      />
    </>
  );
}
