import { DashboardItem } from '@core/models/dashboard';
import StatusBadge from '@shared/components/status-badge';
import Icon from '@shared/design-system_old/Icon';
import Tooltip from '@shared/design-system_old/tooltip';

import IdentificationCar from './identification-car';
import styles from './styles.module.css';

type TStatusCardProps = { item: DashboardItem; onClick: () => void };
const StatusCard = ({ onClick, item }: TStatusCardProps) => {
  const { clientName, observation, status, license, brand, model, year } = item;

  return (
    <button className={styles.container} onClick={onClick}>
      <p className="w-full text-left text-xs whitespace-nowrap overflow-hidden text-ellipsis">
        {clientName}
      </p>

      <IdentificationCar license={license} brand={brand} model={model} year={year} />

      <div
        className={`w-full flex items-center ${observation ? 'justify-between' : 'justify-end'} `}
      >
        {observation && (
          <Tooltip
            title={
              <>
                <b>Observação:</b> {observation}
              </>
            }
          >
            <Icon name="InfoIcon" className="text-teal-600" />
          </Tooltip>
        )}

        <StatusBadge status={status} />
      </div>
    </button>
  );
};

export default StatusCard;
