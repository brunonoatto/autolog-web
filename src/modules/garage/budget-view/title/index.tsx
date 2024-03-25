import type { TCar } from '@core/api/car/types';
import StatusBadge from '@modules/garage/dashboard/status-badge';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

type TTitleProps = {
  car?: TCar;
  status?: BudgetStatusEnum;
};

export default function BudgetTitle({ car, status }: TTitleProps) {
  const { license, brand, model, year } = car || {};

  return (
    <div className="flex justify-between">
      <div>
        <h2>{license}</h2>
        <h5>
          {brand} {' - '} {model} {' - '} {year}
        </h5>
      </div>
      <div className="mt-auto">{status && <StatusBadge status={status} />}</div>
    </div>
  );
}
