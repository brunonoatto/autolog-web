import { ReactNode } from 'react';

import type { TCar, TStatusCar } from '@core/models/car';
import Icon from '@shared/components/Icon';
import IdentificationCar from './identification-car';
import styles from './styles.module.css';

const statusIcon: { [key in TStatusCar]: ReactNode } = {
  WaitingBudget: (
    <>
      <Icon name="FileExclamationIcon" height={26} width={26} className="fill-teal-500" /> Realizando orçamento
    </>
  ),
  WaitingBudgetApproval: (
    <>
      <Icon name="SendIcon" height={26} width={26} className="fill-amber-400" /> Aguardando aprovação
    </>
  ),
  ApprovedBudget: (
    <>
      <Icon name="CheckCircleIcon" height={26} width={26} className="fill-green-500" /> Orçamento aprovado
    </>
  ),
  BudgetRejected: (
    <>
      <Icon name="CloseCircleIcon" height={26} width={26} className="fill-red-400" /> Orçamento rejeitado
    </>
  ),
  RunningService: (
    <>
      <Icon name="ProgressWrenchIcon" height={26} width={26} className="fill-amber-400" /> Serviço em execução
    </>
  ),
};

export type TStatusCardProps = TCar & { status: TStatusCar };
const StatusCard = ({ status, ...car }: TStatusCardProps) => {
  return (
    <button className={styles.container}>
      <IdentificationCar {...car} />

      <div className="w-full flex gap-2 items-center justify-end ">{statusIcon[status]}</div>
    </button>
  );
};

export default StatusCard;
