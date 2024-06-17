import { useSearchParams } from 'react-router-dom';

import { useLicenseSearchBudgets } from '@core/service/budget';
import BudgetCard from '@shared/components/budget-card';
import ClientCarSelect from '@shared/components/selects/client-cars';
import { Alert, AlertTitle } from '@shared/design-system/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/design-system/ui/card';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

export default function ClientBudgetSearch() {
  const navigate = useNavigateCustom();
  const [, setSearchParams] = useSearchParams();
  const { budgets } = useLicenseSearchBudgets();

  const handleGoToBudget = (os: string) => {
    navigate(['/cliente/orcamento', os]);
  };

  const handleLicenseFilterChange = (value: string) => {
    if (value) {
      setSearchParams({ license: value });
    } else {
      setSearchParams((prev) => {
        prev.delete('license');
        return prev;
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle icon="receipt">Orçamentos</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <ClientCarSelect label="Veículo" onValueChange={handleLicenseFilterChange} />

        {!budgets.length && (
          <Alert>
            <AlertTitle>Nenhum orçamento encontrado.</AlertTitle>
          </Alert>
        )}

        {budgets?.map(({ os, garageName, createdDate, status, car }) => {
          return (
            <button key={os} className="w-full" onClick={() => handleGoToBudget(os)}>
              <BudgetCard
                hover
                garageName={garageName}
                car={car}
                status={status}
                createdDate={createdDate}
              />
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}
