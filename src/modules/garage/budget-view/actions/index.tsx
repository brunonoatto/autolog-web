import React from 'react';

import BackToBudget from '@modules/garage/budget-view/actions/back-to-budget';
import CompletedService from '@modules/garage/budget-view/actions/completed-budget';
import RemakeBudget from '@modules/garage/budget-view/actions/remake-budget';
import SendForApproval from '@modules/garage/budget-view/actions/send-for-approval';
import SendWhatsApp from '@modules/garage/budget-view/actions/send-whats-app';
import StartService from '@modules/garage/budget-view/actions/start-service';
import Button from '@shared/design-system/button';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

const actionsByStatus: { [key in BudgetStatusEnum]: (os: string) => React.ReactNode } = {
  [BudgetStatusEnum.MakingBudget]: (os: string) => <SendForApproval os={os} />,
  [BudgetStatusEnum.WaitingBudgetApproval]: (os: string) => (
    <>
      <SendWhatsApp os={os} />
      <BackToBudget os={os} />
    </>
  ),
  [BudgetStatusEnum.ApprovedBudget]: (os) => <StartService os={os} />,
  [BudgetStatusEnum.BudgetRejected]: (os) => (
    <>
      <Button>Cancelar orçamento</Button>
      <RemakeBudget os={os} />
    </>
  ),
  [BudgetStatusEnum.RunningService]: (os) => (
    <>
      <BackToBudget os={os} />
      <CompletedService os={os} />
    </>
  ),
  [BudgetStatusEnum.CarReady]: () => <>Veículo entregue</>,
  [BudgetStatusEnum.Finished]: () => <></>,
};

type TBudgetActionsParams = {
  os: string;
  status: BudgetStatusEnum;
};

export default function BudgetActions({ os, status }: TBudgetActionsParams) {
  return <div className="flex gap-2 justify-end">{actionsByStatus[status](os)}</div>;
}
