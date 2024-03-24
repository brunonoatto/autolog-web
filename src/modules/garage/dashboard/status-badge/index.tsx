import { ReactNode } from 'react';

import { StatusCarEnum } from '@shared/types/statusCar';
import Icon from '@shared/design-system/Icon';
import { twMerge } from 'tailwind-merge';
import { getStatusCarDescription } from '@shared/helpers/string';

const statusIcon: { [key in StatusCarEnum]: ReactNode } = {
  [StatusCarEnum.WaitingBudget]: (
    <Icon name="BudgetLoadingIcon" height={26} width={26} className="fill-teal-500 inline" />
  ),
  [StatusCarEnum.WaitingBudgetApproval]: (
    <Icon name="HourglassIcon" height={26} width={26} className="fill-amber-400 inline" />
  ),
  [StatusCarEnum.ApprovedBudget]: (
    <Icon name="CheckCircleIcon" height={26} width={26} className="fill-green-500 inline" />
  ),
  [StatusCarEnum.BudgetRejected]: (
    <Icon name="ThumbDownIcon" height={26} width={26} className="fill-red-400 inline" />
  ),
  [StatusCarEnum.RunningService]: (
    <Icon name="ProgressWrenchIcon" height={26} width={26} className="fill-amber-400 inline" />
  ),
  [StatusCarEnum.Finished]: null,
};

type TStatusBadgeProps = { status: StatusCarEnum; className?: string };
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
