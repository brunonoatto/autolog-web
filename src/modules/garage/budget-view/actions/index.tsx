import { CircleOff } from 'lucide-react';

import useBudgetViewContext from '@core/store/context/BudgetViewContext/hook';
import BackToBudget from '@modules/garage/budget-view/actions/back-to-budget';
import CompletedService from '@modules/garage/budget-view/actions/completed-budget';
import RemakeBudget from '@modules/garage/budget-view/actions/remake-budget';
import SendForApproval from '@modules/garage/budget-view/actions/send-for-approval';
import SendWhatsApp from '@modules/garage/budget-view/actions/send-whats-app';
import StartService from '@modules/garage/budget-view/actions/start-service';
import { Button } from '@shared/design-system/ui/button';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

const actionsByStatus: { [key in BudgetStatusEnum]?: React.ReactNode } = {
  [BudgetStatusEnum.MakingBudget]: <SendForApproval />,
  [BudgetStatusEnum.WaitingBudgetApproval]: (
    <>
      <BackToBudget />
      <SendWhatsApp />
    </>
  ),
  [BudgetStatusEnum.ApprovedBudget]: <StartService />,
  [BudgetStatusEnum.BudgetRejected]: (
    <>
      <Button icon={CircleOff} variant="outline">
        Cancelar orçamento
      </Button>
      <RemakeBudget />
    </>
  ),
  [BudgetStatusEnum.RunningService]: (
    <>
      <BackToBudget />
      <CompletedService />
    </>
  ),
};

export default function BudgetViewActions() {
  const { budget } = useBudgetViewContext();
  const { status, items } = budget || {};

  const showActions = status && !!items?.length;

  if (!showActions) return null;

  return <div className="flex gap-2 justify-end">{actionsByStatus[status]}</div>;
}
