import { useParams } from 'react-router-dom';

import { useGetBudget, useObservationUpdate } from '@core/service/budget';
import { BudgetViewProvider } from '@core/store/context/BudgetViewContext';
import BudgetViewActions from '@modules/garage/budget-view/actions';
import { AddBugdetItemForm } from '@modules/garage/budget-view/add-budget-item-form';
import { GARAGE_BUDGET_VIEW_CARD_TEST_ID } from '@modules/garage/budget-view/consts';
import BudgetCard from '@shared/components/budget-card';
import { BudgetObservationsContainer } from '@shared/components/budget-observations-container';
import BudgetTable from '@shared/components/budget-table';
import { RenderLoadingData } from '@shared/components/render-loading-data';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/design-system/ui/card';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

function GarageBudgetViewContent() {
  const { osOrBudgetId } = useParams();
  const { mutate: observationUpdateMutate, isPending: isPendingMutate } =
    useObservationUpdate(osOrBudgetId);

  const { budget, isLoading } = useGetBudget();
  const { id, status, car, observation, observationClient } = budget || {};

  const allowEditBudget = status === BudgetStatusEnum.MakingBudget;

  const handleObservationSave = (newObservation: string) => {
    observationUpdateMutate({ budgetId: id!, observation: newObservation });
  };

  return (
    <Card data-testid={GARAGE_BUDGET_VIEW_CARD_TEST_ID}>
      <CardHeader>
        <CardTitle>Orçamento {osOrBudgetId}</CardTitle>
      </CardHeader>
      <CardContent>
        <RenderLoadingData
          isLoading={isLoading}
          hasData={!!budget}
          notFoundTitle={`Orçamento ${osOrBudgetId} não encontrado.`}
        >
          <BudgetCard status={status} car={car} />

          <BudgetObservationsContainer
            observationData={{
              observation: observation,
              isLoading: isPendingMutate,
              onEditedCallback: handleObservationSave,
            }}
            observationClientData={{
              observation: observationClient,
            }}
          />

          {allowEditBudget && <AddBugdetItemForm />}

          <BudgetTable allowActions={allowEditBudget} />

          <BudgetViewActions />
        </RenderLoadingData>
      </CardContent>
    </Card>
  );
}

export default function GarageBudgetView() {
  return (
    <BudgetViewProvider>
      <GarageBudgetViewContent />
    </BudgetViewProvider>
  );
}
