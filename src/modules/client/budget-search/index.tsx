import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useListBudgets } from '@core/service/budget';
import BudgetCard from '@shared/components/budget-card';
import Container from '@shared/components/container';

export default function ClientBudgetSearch() {
  const navigate = useNavigate();
  const { data: budgets } = useListBudgets();

  const handleGoToBudget = (os: string) => {
    navigate(`${ROUTES_PATH.clientBudgetView}/${os}`);
  };

  return (
    <Container title="Orçamentos">
      <div className="space-y-4">
        {budgets?.map(({ os, createdDate, status, car }) => {
          return (
            <button key={os} className="w-full" onClick={() => handleGoToBudget(os)}>
              <BudgetCard hover status={status} car={car} createdDate={createdDate} />
            </button>
          );
        })}
      </div>
    </Container>
  );
}
