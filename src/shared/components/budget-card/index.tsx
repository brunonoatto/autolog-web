import type { TCar } from '@core/api/car/types';
import CarInfo from '@shared/components/car-info';
import StatusBadge from '@shared/components/status-badge';
import { CardTitle } from '@shared/design-system/ui/card';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

type TBudgetCardProps = {
  createdDate?: string;
  clientName?: string;
  status?: BudgetStatusEnum;
  car?: TCar;
  observation?: string;
  hover?: boolean;
};

export default function BudgetCard({
  createdDate,
  status,
  clientName,
  car,
  observation,
  hover = false,
}: TBudgetCardProps) {
  if (!status || !car) return null;

  return (
    <>
      <div
        data-hover={hover}
        className="w-full rounded-lg ring-1 ring-primary data-[hover=true]:hover:ring-2 p-2 md:p-3 flex flex-col duration-300 data-[hover=true]:hover:scale-[1.01]"
      >
        {clientName && createdDate && (
          <div className="flex justify-between text-sm">
            <p className="whitespace-nowrap overflow-hidden text-ellipsis">{clientName}</p>
            <p>{createdDate}</p>
          </div>
        )}

        <div className="flex justify-between">
          <div>
            <CarInfo {...car} />

            {!clientName && createdDate && <p className="text-left">{createdDate}</p>}
          </div>

          <div className="mt-auto">
            <StatusBadge status={status} />
          </div>
        </div>
      </div>

      {observation && (
        <>
          <CardTitle icon="notebook-pen" size="lg">
            Observação
          </CardTitle>{' '}
          {observation}
        </>
      )}
    </>
  );
}
