import { ChangeEventHandler } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useListBudgets } from '@core/service/budget';
import BudgetCard from '@shared/components/budget-card';
import Container from '@shared/components/container';
import ClientCarSelect from '@shared/components/selects/client-cars';

export default function ClientBudgetSearch() {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const { data: budgets = [] } = useListBudgets();

  const handleGoToBudget = (os: string) => {
    navigate(`${ROUTES_PATH.clientBudgetView}/${os}`);
  };

  const handleLicenseFilterChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (e.target.value) {
      setSearchParams({ license: e.target.value });
    } else {
      setSearchParams();
    }
  };

  return (
    <Container title="Orçamentos">
      <Container.Content>
        <ClientCarSelect label="Carro" onChange={handleLicenseFilterChange} />

        {budgets?.map(({ os, createdDate, status, car }) => {
          return (
            <button key={os} className="w-full" onClick={() => handleGoToBudget(os)}>
              <BudgetCard hover status={status} car={car} createdDate={createdDate} />
            </button>
          );
        })}
      </Container.Content>
    </Container>
  );
}
