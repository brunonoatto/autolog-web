import { useGetBudget } from '@core/service/budget';
import CarInfo from '@shared/components/car-info';
import StatusBadge from '@shared/components/status-badge';

type TBudgetCardProps = {
  hover?: boolean;
};

export default function BudgetCard({ hover = false }: TBudgetCardProps) {
  const { data: budget } = useGetBudget();
  const { car, status } = budget || {};

  return (
    <div
      data-hover={hover}
      className="w-full rounded-lg border-2 border-teal-500 data-[hover=true]:hover:border-4 p-1 md:p-3 flex justify-between"
    >
      {car && <CarInfo {...car} />}

      <div className="mt-auto">
        <StatusBadge status={status} />
      </div>
    </div>
  );
}
