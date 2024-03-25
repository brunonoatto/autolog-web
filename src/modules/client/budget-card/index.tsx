import type { TCar } from '@core/api/car/types';
import StatusBadge from '@shared/components/status-badge';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

type TBudgetCardProps = {
  status: BudgetStatusEnum;
  car: TCar;
  hover?: boolean;
};
export default function BudgetCard({
  status,
  car: { license, brand, model, year },
  hover = false,
}: TBudgetCardProps) {
  return (
    <div
      data-hover={hover}
      className="w-full rounded-lg border-2 border-teal-500 data-[hover=true]:hover:border-4 p-1 md:p-3 flex justify-between"
    >
      <div className="text-left">
        <h4 className="font-semibold">{license}</h4>
        <h5>
          {brand} - {model} - {year}
        </h5>
      </div>

      <div className="mt-auto">
        <StatusBadge status={status} />
      </div>
    </div>
  );
}
