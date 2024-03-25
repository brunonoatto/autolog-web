import ApproveButton from '@modules/client/budget-view/action-buttons/approve-button';
import RejectButton from '@modules/client/budget-view/action-buttons/reject-button';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

type TBudgetActionButtonsProps = {
  os: string;
  status: BudgetStatusEnum;
};

export default function BudgetActionButtons({ os, status }: TBudgetActionButtonsProps) {
  if (status !== BudgetStatusEnum.WaitingBudgetApproval) return null;

  return (
    <div className="flex justify-end gap-2">
      <RejectButton />
      <ApproveButton os={os} />
    </div>
  );
}
