import ApproveButton from '@modules/client/budget-view/action-buttons/approve-button';
import ReceiveButton from '@modules/client/budget-view/action-buttons/receive-car';
import RejectButton from '@modules/client/budget-view/action-buttons/reject-button';
import type { TActionButtonProps } from '@modules/client/budget-view/action-buttons/types';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

type TActionByStatus = {
  status: BudgetStatusEnum;
  buttons: ((props: TActionButtonProps) => JSX.Element)[];
};

const actionsByStatus: TActionByStatus[] = [
  {
    status: BudgetStatusEnum.WaitingBudgetApproval,
    buttons: [RejectButton, ApproveButton],
  },
  {
    status: BudgetStatusEnum.CarReady,
    buttons: [ReceiveButton],
  },
];

type TBudgetActionButtonsProps = {
  os: string;
  status: BudgetStatusEnum;
};

export default function BudgetActionButtons({ os, status }: TBudgetActionButtonsProps) {
  const statusActions = actionsByStatus.find((action) => action.status === status);

  const actions = statusActions?.buttons || [];

  if (!statusActions) {
    return null;
  }

  return (
    <div className="flex justify-end gap-2">
      {actions.map((Action, index) => (
        <Action key={`${os}${index}`} os={os} />
      ))}
    </div>
  );
}
