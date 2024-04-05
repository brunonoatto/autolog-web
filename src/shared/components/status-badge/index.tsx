import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import Icon from '@shared/design-system/Icon';
import { getStatusCarDescription } from '@shared/helpers/string';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

const statusIcon: { [key in BudgetStatusEnum]: ReactNode } = {
  [BudgetStatusEnum.MakingBudget]: (
    <Icon name="BudgetLoadingIcon" height={26} width={26} className="fill-teal-500 inline" />
  ),
  [BudgetStatusEnum.WaitingBudgetApproval]: (
    <Icon name="HourglassIcon" height={26} width={26} className="fill-sky-400 inline" />
  ),
  [BudgetStatusEnum.ApprovedBudget]: (
    <Icon name="CheckCircleIcon" height={26} width={26} className="fill-green-500 inline" />
  ),
  [BudgetStatusEnum.BudgetRejected]: (
    <Icon name="ThumbDownIcon" height={26} width={26} className="fill-red-400 inline" />
  ),
  [BudgetStatusEnum.RunningService]: (
    <Icon name="ProgressWrenchIcon" height={26} width={26} className="fill-yellow-400 inline" />
  ),
  [BudgetStatusEnum.CarReady]: (
    <Icon name="CarDoneIcon" height={26} width={26} className="fill-green-500 inline" />
  ),
  [BudgetStatusEnum.Finished]: null,
};

type TStatusBadgeProps = { status?: BudgetStatusEnum; className?: string };
const StatusBadge = ({ status, className }: TStatusBadgeProps) => {
  if (!status) return null;

  return (
    <div
      className={twMerge(
        'inline-block space-x-2 px-2 py-1 rounded-lg border-2 border-teal-800 whitespace-nowrap',
        className,
      )}
    >
      {statusIcon[status]}
      <div className="inline whitespace-nowrap">{getStatusCarDescription(status)}</div>
    </div>
  );
};

export default StatusBadge;
