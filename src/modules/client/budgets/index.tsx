import { useListBudgets } from '@core/service/budget';
import StatusBadge from '@shared/components/status-badge';

export default function ClientBudgets() {
  const { data: budgets } = useListBudgets();

  return (
    <div className="space-y-4">
      <h3>Lista de orçamentos</h3>

      <div className="space-y-2">
        {budgets?.map(({ os, license, status, car: { brand, model, year } }) => {
          return (
            <div
              key={os}
              className="rounded-lg border-2 border-teal-500 p-1 md:p-3 flex justify-between"
            >
              <div>
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
        })}
      </div>
    </div>
  );
}
