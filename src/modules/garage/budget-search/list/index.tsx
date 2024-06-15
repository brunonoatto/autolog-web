import { useLicenseSearchBudgets } from '@core/service/budget';
import BudgetCard from '@shared/components/budget-card';
import { RenderLoadingData } from '@shared/components/render-loading-data';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/design-system/ui/card';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

export default function ListBudgets() {
  const navigate = useNavigateCustom();
  const { budgets, isLoading } = useLicenseSearchBudgets();

  const handleBudgetSelected = (os: string) => {
    navigate(['/garage/orcamento', os]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle size="lg">Resultado ({budgets?.length || 0})</CardTitle>
      </CardHeader>

      <CardContent>
        <RenderLoadingData
          isLoading={isLoading}
          hasData={!!budgets}
          notFoundTitle="Nenhum orçamento encontrado."
        >
          {budgets.map(({ os, createdDate, status, clientName, car }) => {
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
        </RenderLoadingData>
      </CardContent>
    </Card>
  );
}
