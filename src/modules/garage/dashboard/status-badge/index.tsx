import { ReactNode } from 'react';

import { BudgetStatusEnum } from '@shared/types/budgetStatus';
import Icon from '@shared/design-system/Icon';
import { twMerge } from 'tailwind-merge';
import { getStatusCarDescription } from '@shared/helpers/string';

const statusIcon: { [key in BudgetStatusEnum]: ReactNode } = {
  [BudgetStatusEnum.MakingBudget]: (
    <Icon name="BudgetLoadingIcon" height={26} width={26} className="fill-teal-500 inline" />
  ),
  [BudgetStatusEnum.WaitingBudgetApproval]: (
    <Icon name="HourglassIcon" height={26} width={26} className="fill-amber-400 inline" />
  ),
  [BudgetStatusEnum.ApprovedBudget]: (
    <Icon name="CheckCircleIcon" height={26} width={26} className="fill-green-500 inline" />
  ),
  [BudgetStatusEnum.BudgetRejected]: (
    <Icon name="ThumbDownIcon" height={26} width={26} className="fill-red-400 inline" />
  ),
  [BudgetStatusEnum.RunningService]: (
    <Icon name="ProgressWrenchIcon" height={26} width={26} className="fill-amber-400 inline" />
  ),
  [BudgetStatusEnum.CarReady]: (
    <Icon name="CarDoneIcon" height={26} width={26} className="fill-amber-400 inline" />
  ),
  [BudgetStatusEnum.Finished]: null,
};

type TStatusBadgeProps = { status: BudgetStatusEnum; className?: string };
const StatusBadge = ({ status, className }: TStatusBadgeProps) => {
  return (
    <div
      className={twMerge(
        'inline-block space-x-2 px-2 py-1 rounded-lg border-2 border-teal-800',
        className,
      )}
    >
      {statusIcon[status]}
      <div className="inline">{getStatusCarDescription(status)}</div>
    </div>
  );
};

export default StatusBadge;
