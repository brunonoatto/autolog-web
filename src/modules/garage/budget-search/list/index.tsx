import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useListBudgets } from '@core/service/budget';
import BudgetCard from '@shared/components/budget-card';
import Title from '@shared/components/title';

export default function ListBudgets() {
  const navigate = useNavigate();
  const { data: budgets } = useListBudgets();

  const handleBudgetSelected = (os: string) => {
    navigate(`${ROUTES_PATH.garageBudgetView}/${os}`);
  };

  return (
    <div className="space-y-4">
      <Title>Orçamentos (${budgets?.length || 0})</Title>
      {budgets?.map(({ os, createdDate, status, clientName, car }) => {
        return (
          <button key={os} className="w-full" onClick={() => handleBudgetSelected(os)}>
            <BudgetCard
              hover
              createdDate={createdDate}
              status={status}
              clientName={clientName}
              car={car}
            />
          </button>
        );
      })}
    </div>
  );
}
