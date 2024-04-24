import { useListBudgets } from '@core/service/budget';
import BudgetCard from '@shared/components/budget-card';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/design-system/ui/card';
import useNavigateApp from '@shared/hooks/useNavigateApp';

export default function ListBudgets() {
  const navigate = useNavigateApp();
  const { data: budgets } = useListBudgets();

  const handleBudgetSelected = (os: string) => {
    navigate(['/garage/orcamento', os]);
  };

  // TODO: fazer card para quando não retornar resultados

  return (
    <Card>
      <CardHeader>
        <CardTitle size="lg">Resultado ({budgets?.length || 0})</CardTitle>
      </CardHeader>

      <CardContent>
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
      </CardContent>
    </Card>
  );
}
