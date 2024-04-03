import { DashboardItem } from '@core/models/dashboard';
import StatusBadge from '@shared/components/status-badge';

import IdentificationCar from './identification-car';
import styles from './styles.module.css';

type TStatusCardProps = { item: DashboardItem; onClick: () => void };
const StatusCard = ({ onClick, item }: TStatusCardProps) => {
  const { clientName, status, license, brand, model, year } = item;

  return (
    <button className={styles.container} onClick={onClick}>
      <p className="text-xs">{clientName}</p>

      <IdentificationCar license={license} brand={brand} model={model} year={year} />

      <StatusBadge className="self-end" status={status} />
    </button>
  );
};

export default StatusCard;
