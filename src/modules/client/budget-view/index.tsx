import { useGetBudget } from '@core/service/budget';
import { BudgetViewProvider } from '@core/store/context/BudgetViewContext';
import BudgetViewActionButtons from '@modules/client/budget-view/action-buttons';
import BudgetCard from '@shared/components/budget-card';
import { BudgetObservationsContainer } from '@shared/components/budget-observations-container';
import BudgetTable from '@shared/components/budget-table';
import { RenderLoadingData } from '@shared/components/render-loading-data';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shared/design-system/ui/card';

function ClientBudgetViewContent() {
  const { budget, isLoading } = useGetBudget();

  const { os, garageName, createdDate, status, car, observation, observationClient } = budget || {};

  return (
    <Card>
      <CardHeader>
        <CardTitle icon="receipt">Orçamento {os}</CardTitle>
      </CardHeader>

      <CardContent>
        <RenderLoadingData
          isLoading={isLoading}
          hasData={!!budget}
          notFoundTitle="Orçamento não encontrado."
        >
          <BudgetCard garageName={garageName} createdDate={createdDate} status={status} car={car} />

          <BudgetObservationsContainer
            observationData={{
              observation: observation,
            }}
            observationClientData={{
              observation: observationClient,
            }}
          />

          <BudgetTable />
        </RenderLoadingData>
      </CardContent>

      <CardFooter>
        <BudgetViewActionButtons />
      </CardFooter>
    </Card>
  );
}

export default function ClientBudgetView() {
  return (
    <BudgetViewProvider>
      <ClientBudgetViewContent />
    </BudgetViewProvider>
  );
}
