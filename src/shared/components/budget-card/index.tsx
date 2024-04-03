import type { TCar } from '@core/api/car/types';
import CarInfo from '@shared/components/car-info';
import StatusBadge from '@shared/components/status-badge';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

type TBudgetCardProps = {
  status?: BudgetStatusEnum;
  car?: TCar;
  hover?: boolean;
};

export default function BudgetCard({ status, car, hover = false }: TBudgetCardProps) {
  if (!status || !car) return null;

  return (
    <div
      data-hover={hover}
      className="w-full rounded-lg border-2 border-teal-500 data-[hover=true]:hover:border-4 p-1 md:p-3 flex justify-between"
    >
      <CarInfo {...car} />

      <div className="mt-auto">
        <StatusBadge status={status} />
      </div>
    </div>
  );
}
