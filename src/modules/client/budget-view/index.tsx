import { useGetBudget } from '@core/service/budget';
import { BudgetViewProvider } from '@core/store/context/BudgetViewContext';
import BudgetViewActionButtons from '@modules/client/budget-view/action-buttons';
import BudgetCard from '@shared/components/budget-card';
import BudgetTable from '@shared/components/budget-table';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shared/design-system/ui/card';

function ClientBudgetViewContent() {
  const { data: budget } = useGetBudget();

  const { createdDate, status, car, observation } = budget || {};

  if (!budget) {
    return <>Loading...</>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle icon="receipt">Orçamento</CardTitle>
      </CardHeader>

      <CardContent>
        <BudgetCard createdDate={createdDate} status={status} car={car} observation={observation} />

        <BudgetTable />
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
