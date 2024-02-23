import { ReactNode } from 'react';

import { StatusCarEnum } from '@core/models/car';
import type { TCar } from '@core/models/car';
import Icon from '@shared/components/Icon';
import IdentificationCar from './identification-car';
import styles from './styles.module.css';
import { getStatusCarDescription } from '@shared/helpers/string';

const statusIcon: { [key in StatusCarEnum]: ReactNode } = {
  [StatusCarEnum.WaitingBudget]: <Icon name="FileExclamationIcon" height={26} width={26} className="fill-teal-500" />,
  [StatusCarEnum.WaitingBudgetApproval]: <Icon name="SendIcon" height={26} width={26} className="fill-amber-400" />,
  [StatusCarEnum.ApprovedBudget]: <Icon name="CheckCircleIcon" height={26} width={26} className="fill-green-500" />,
  [StatusCarEnum.BudgetRejected]: <Icon name="CloseCircleIcon" height={26} width={26} className="fill-red-400" />,
  [StatusCarEnum.RunningService]: <Icon name="ProgressWrenchIcon" height={26} width={26} className="fill-amber-400" />,
};

export type TStatusCardProps = TCar & { status: StatusCarEnum };
const StatusCard = ({ status, ...car }: TStatusCardProps) => {
  return (
    <button className={styles.container}>
      <IdentificationCar {...car} />

      <div className="w-full flex gap-2 items-center justify-end ">
        {statusIcon[status]}
        {getStatusCarDescription(status)}
      </div>
    </button>
  );
};

export default StatusCard;
