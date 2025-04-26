import { useGetBudget, useObservationUpdate } from '@core/service/budget';
import { BudgetViewProvider } from '@core/store/context/BudgetViewContext/provider';
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
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

function ClientBudgetViewContent() {
  const { mutate: observationUpdateMutate, isPending: isPendingMutate } = useObservationUpdate();

  const { budget, isLoading } = useGetBudget();

  const { id, os, garageName, createdDate, status, car, observation, observationClient } =
    budget || {};

  const allowEdit = status === BudgetStatusEnum.WaitingBudgetApproval;

  const handleObservationSave = (newObservation: string) => {
    observationUpdateMutate({ budgetId: id!, observation: newObservation, ofClient: true });
  };

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
              allowEdit,
              observation: observationClient,
              isLoading: isPendingMutate,
              onEditedCallback: handleObservationSave,
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
