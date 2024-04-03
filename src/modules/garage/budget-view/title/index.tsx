import useGarageBudgetView from '@core/store/context/hooks/useGarageBudgetViewContext';
import CarInfo from '@shared/components/car-info';
import StatusBadge from '@shared/components/status-badge';

export default function BudgetViewTitle() {
  const { budget } = useGarageBudgetView();
  const { status, car } = budget || {};

  return (
    <div className="flex justify-between">
      {car && <CarInfo {...car} />}

      <div className="mt-auto">
        <StatusBadge status={status} />
      </div>
    </div>
  );
}
