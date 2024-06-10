import { useParams } from 'react-router-dom';

import { useGetBudget } from '@core/service/budget';
import { BudgetViewProvider } from '@core/store/context/BudgetViewContext';
import BudgetViewActionButtons from '@modules/client/budget-view/action-buttons';
import BudgetCard from '@shared/components/budget-card';
import { BudgetObservation } from '@shared/components/budget-observation';
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
  const { os: osParam } = useParams();

  const { budget, isLoading } = useGetBudget();

  const { garageName, createdDate, status, car, observation } = budget || {};

  return (
    <Card>
      <CardHeader>
        <CardTitle icon="receipt">Orçamento {osParam}</CardTitle>
      </CardHeader>

      <CardContent>
        <RenderLoadingData
          isLoading={isLoading}
          hasData={!!budget}
          notFoundText="Orçamento não encontrado."
        >
          <BudgetCard garageName={garageName} createdDate={createdDate} status={status} car={car} />

          <BudgetObservation observation={observation} />

          <BudgetTable />
        </RenderLoadingData>
      </CardContent>

      <CardFooter>
        <BudgetViewActionButtons />
      </CardFooter>
    </Card>
  );
}

export default function GarageBudgetView() {
  return (
    <BudgetViewProvider>
      <ClientBudgetViewContent />
    </BudgetViewProvider>
  );
}
