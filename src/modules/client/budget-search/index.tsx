import { useSearchParams } from 'react-router-dom';

import { useListBudgets } from '@core/service/budget';
import BudgetCard from '@shared/components/budget-card';
import ClientCarSelect from '@shared/components/selects/client-cars';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/design-system/ui/card';
import useNavigateApp from '@shared/hooks/useNavigateApp';

export default function ClientBudgetSearch() {
  const navigate = useNavigateApp();
  const [, setSearchParams] = useSearchParams();
  const { data: budgets = [] } = useListBudgets();

  const handleGoToBudget = (os: string) => {
    navigate(['/cliente/orcamento', os]);
  };

  const handleLicenseFilterChange = (value: string) => {
    if (value) {
      setSearchParams({ license: value });
    } else {
      setSearchParams();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle icon="receipt">Orçamentos</CardTitle>
      </CardHeader>

      <CardContent>
        <ClientCarSelect label="Carro" onValueChange={handleLicenseFilterChange} />

        {budgets?.map(({ os, createdDate, status, car }) => {
          return (
            <button key={os} className="w-full" onClick={() => handleGoToBudget(os)}>
              <BudgetCard hover status={status} car={car} createdDate={createdDate} />
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}
