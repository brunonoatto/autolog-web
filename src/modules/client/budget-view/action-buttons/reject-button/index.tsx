import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useRemakeBudget } from '@core/service/budget';
import type { TActionButtonProps } from '@modules/client/budget-view/action-buttons/types';
import IconButton from '@shared/design-system/icon-button';
import Modal from '@shared/design-system/modal';

export default function RejectButton({ os }: TActionButtonProps) {
  const navigate = useNavigate();
  const { mutate } = useRemakeBudget();
  const [openModal, setOpenModal] = useState(false);

  const handleGoToBudgets = () => {
    navigate(ROUTES_PATH.clientBudgetSearch);
  };

  const handleRejectBudget = () => {
    mutate(os, {
      onSuccess: () => {
        setOpenModal(true);
      },
    });
  };

  return (
    <>
      <IconButton icon="ThumbDownIcon" color="cancel" onClick={handleRejectBudget}>
        Rejeitar orçamento
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
