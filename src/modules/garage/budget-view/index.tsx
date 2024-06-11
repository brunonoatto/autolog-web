import { useParams } from 'react-router-dom';

import { useGetBudget, useObservationUpdate } from '@core/service/budget';
import { BudgetViewProvider } from '@core/store/context/BudgetViewContext';
import BudgetViewActions from '@modules/garage/budget-view/actions';
import { GARAGE_BUDGET_VIEW_CARD_TEST_ID } from '@modules/garage/budget-view/consts';
import BudgetViewForm from '@modules/garage/budget-view/form';
import BudgetCard from '@shared/components/budget-card';
import { BudgetObservation } from '@shared/components/budget-observation';
import BudgetTable from '@shared/components/budget-table';
import { RenderLoadingData } from '@shared/components/render-loading-data';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/design-system/ui/card';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

function GarageBudgetViewContent() {
  const { os: osParam } = useParams();
  const { mutate: observationUpdateMutate, isPending: isPendingMutate } =
    useObservationUpdate(osParam);

  const { budget, isLoading } = useGetBudget();
  const { id, status, car, observation } = budget || {};

  const allowEditBudget = status === BudgetStatusEnum.MakingBudget;

  const handleObservationSave = (newObservation: string) => {
    observationUpdateMutate({ budgetId: id!, observation: newObservation });
  };

  return (
    <Card data-testid={GARAGE_BUDGET_VIEW_CARD_TEST_ID}>
      <CardHeader>
        <CardTitle>Orçamento</CardTitle>
      </CardHeader>
      <CardContent>
        <RenderLoadingData
          isLoading={isLoading}
          hasData={!!budget}
          notFoundTitle={`Orçamento ${osParam} não encontrado.`}
        >
          <BudgetCard status={status} car={car} />

          <BudgetObservation
            observation={observation}
            isLoading={isPendingMutate}
            onEditedCallback={handleObservationSave}
          />

          {allowEditBudget && <BudgetViewForm />}

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
