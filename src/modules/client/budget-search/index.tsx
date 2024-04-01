import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useListBudgets } from '@core/service/budget';
import BudgetCard from '@modules/client/budget-card';

export default function ClientBudgetSearch() {
  const navigate = useNavigate();
  const { data: budgets } = useListBudgets();

  const handleGoToBudget = (os: string) => {
    navigate(`${ROUTES_PATH.clientBudgetView}/${os}`);
  };

  return (
    <div className="space-y-4">
      <h3>Lista de orçamentos</h3>

      <div className="space-y-2">
        {budgets?.map(({ os, status, car }) => {
          return (
            <button key={os} className="w-full" onClick={() => handleGoToBudget(os)}>
              <BudgetCard hover status={status} car={car} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
