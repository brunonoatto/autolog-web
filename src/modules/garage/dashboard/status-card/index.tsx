import { DashboardItem } from '@core/models/dashboard';
import StatusBadge from '@shared/components/status-badge';
import IdentificationCar from './identification-car';
import styles from './styles.module.css';

type TStatusCardProps = { car: DashboardItem; onClick: () => void };
const StatusCard = ({ onClick, car }: TStatusCardProps) => {
  return (
    <button className={styles.container} onClick={onClick}>
      <IdentificationCar {...car} />

      <StatusBadge className="self-end" status={car.status} />
    </button>
  );
};

export default StatusCard;
