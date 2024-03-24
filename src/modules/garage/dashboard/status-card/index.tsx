import IdentificationCar from './identification-car';
import styles from './styles.module.css';
import { DashboardItem } from '@core/models/dashboard';
import StatusBadge from '@modules/garage/dashboard/status-badge';

type TStatusCardProps = { car: DashboardItem; onClick: () => void };
const StatusCard = ({ onClick, car }: TStatusCardProps) => {
  return (
    <button className={styles.container} onClick={onClick}>
      <IdentificationCar {...car} />

      <StatusBadge className="self-end" {...car} />
    </button>
  );
};

export default StatusCard;
