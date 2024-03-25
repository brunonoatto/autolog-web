import React from 'react';

import Button from '@shared/design-system/button';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';
import StartService from '@modules/garage/budget-view/actions/start-service';
import SendForApproval from '@modules/garage/budget-view/actions/send-for-approval';
import RemakeBudget from '@modules/garage/budget-view/actions/remake-budget';
import CompletedService from '@modules/garage/budget-view/actions/completed-budget';

const BackToBudget = () => <Button>Voltar para realizar orçamento</Button>;

const actionsByStatus: { [key in BudgetStatusEnum]: (os: string) => React.ReactNode } = {
  [BudgetStatusEnum.MakingBudget]: (os: string) => <SendForApproval os={os} />,
  [BudgetStatusEnum.WaitingBudgetApproval]: () => <BackToBudget />,
  [BudgetStatusEnum.ApprovedBudget]: (os) => <StartService os={os} />,
  [BudgetStatusEnum.BudgetRejected]: (os) => (
    <>
      <Button>Cancelar orçamento</Button>
      <RemakeBudget os={os} />
    </>
  ),
  [BudgetStatusEnum.RunningService]: (os) => (
    <>
      <BackToBudget />
      <CompletedService os={os} />
    </>
  ),
  [BudgetStatusEnum.CarReady]: () => <>Veículo entregue</>,
  [BudgetStatusEnum.Finished]: () => <></>,
};

type TBudgetActions = {
  os: string;
  status: BudgetStatusEnum;
};

export default function BudgetActions({ os, status }: TBudgetActions) {
  return <div className="flex gao-2 justify-end">{actionsByStatus[status](os)}</div>;
}
