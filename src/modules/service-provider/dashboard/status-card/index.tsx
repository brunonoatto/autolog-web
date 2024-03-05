import { ReactNode } from 'react';

import { StatusCarEnum } from '@shared/types/statusCar';
import Icon from '@shared/components/Icon';
import IdentificationCar from './identification-car';
import styles from './styles.module.css';
import { DashboardItem } from '@core/models/autolog';

const statusIcon: { [key in StatusCarEnum]: ReactNode } = {
  [StatusCarEnum.WaitingBudget]: (
    <Icon name="BudgetLoadingIcon" height={26} width={26} className="fill-teal-500" />
  ),
  [StatusCarEnum.WaitingBudgetApproval]: (
    <Icon name="HourglassIcon" height={26} width={26} className="fill-amber-400" />
  ),
  [StatusCarEnum.ApprovedBudget]: (
    <Icon name="CheckCircleIcon" height={26} width={26} className="fill-green-500" />
  ),
  [StatusCarEnum.BudgetRejected]: (
    <Icon name="ThumbDownIcon" height={26} width={26} className="fill-red-400" />
  ),
  [StatusCarEnum.RunningService]: (
    <Icon name="ProgressWrenchIcon" height={26} width={26} className="fill-amber-400" />
  ),
};

type TStatusCardProps = DashboardItem & { onClick: () => void };
const StatusCard = ({ onClick, status, statusDescription, ...car }: TStatusCardProps) => {
  return (
    <button className={styles.container} onClick={onClick}>
      <IdentificationCar {...car} />

      <div className="w-full flex gap-2 items-center justify-end ">
        {statusIcon[status]}
        {statusDescription}
      </div>
    </button>
  );
};

export default StatusCard;
