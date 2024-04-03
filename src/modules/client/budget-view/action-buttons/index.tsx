import useGarageBudgetView from '@core/store/context/hooks/useGarageBudgetViewContext';
import ApproveButton from '@modules/client/budget-view/action-buttons/approve-button';
import ReceiveButton from '@modules/client/budget-view/action-buttons/receive-car';
import RejectButton from '@modules/client/budget-view/action-buttons/reject-button';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

const actionsByStatus: { [key in BudgetStatusEnum]?: React.ReactNode } = {
  [BudgetStatusEnum.WaitingBudgetApproval]: (
    <>
      <RejectButton />
      <ApproveButton />
    </>
  ),
  [BudgetStatusEnum.CarReady]: <ReceiveButton />,
};

export default function BudgetActionButtons() {
  const { budget } = useGarageBudgetView();
  const { status } = budget || {};

  const statusActions = status && actionsByStatus[status];

  if (!statusActions) {
    return null;
  }

  return <div className="flex justify-end gap-2">{statusActions}</div>;
}
