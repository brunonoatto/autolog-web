import type { TCar } from '@core/api/car/types';
import CarInfo from '@shared/components/car-info';
import StatusBadge from '@shared/components/status-badge';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

type TTitleProps = {
  car: TCar;
  status: BudgetStatusEnum;
};

export default function BudgetTitle({ car, status }: TTitleProps) {
  return (
    <div className="flex justify-between">
      {car && <CarInfo {...car} />}

      <div className="mt-auto">{status && <StatusBadge status={status} />}</div>
    </div>
  );
}
