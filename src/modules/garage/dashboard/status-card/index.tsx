import { DashboardItem } from '@core/models/dashboard';
import DashboardButton from '@shared/components/dashboard-button';
import StatusBadge from '@shared/components/status-badge';
import Icon from '@shared/design-system/ui/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@shared/design-system/ui/tooltip';

import IdentificationCar from './identification-car';

type TStatusCardProps = { item: DashboardItem; onClick: () => void };
const StatusCard = ({ onClick, item }: TStatusCardProps) => {
  const { clientName, observation, status, license, brand, model, year } = item;

  return (
    <DashboardButton onClick={onClick}>
      <div className="w-full text-left text-xs whitespace-nowrap overflow-hidden text-ellipsis">
        {clientName}
      </div>

      <IdentificationCar license={license} brand={brand} model={model} year={year} />

      <div
        className={`w-full mt-2 flex items-center ${observation ? 'justify-between' : 'justify-end'} `}
      >
        {observation && (
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger>
                <Icon name="info" className="text-teal-600" />
              </TooltipTrigger>
              <TooltipContent className="max-w-80 text-left space-y-2" align="start">
                <p className="flex justify-start items-center gap-2">
                  <Icon className="inline" name="notebook-pen" />
                  <b>Observação:</b>
                </p>
                <p>{observation}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <StatusBadge status={status} />
      </div>
    </DashboardButton>
  );
};

export default StatusCard;
