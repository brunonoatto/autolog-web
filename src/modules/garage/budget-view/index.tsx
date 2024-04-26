import { useGetBudget } from '@core/service/budget';
import { BudgetViewProvider } from '@core/store/context/BudgetViewContext';
import BudgetViewActions from '@modules/garage/budget-view/actions';
import BudgetViewForm from '@modules/garage/budget-view/form';
import BudgetCard from '@shared/components/budget-card';
import BudgetTable from '@shared/components/budget-table';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/design-system/ui/card';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

function GarageBudgetViewContent() {
  const { budget } = useGetBudget();
  const { status, car, observation } = budget || {};

  const allowEditBudget = status === BudgetStatusEnum.MakingBudget;

  if (!budget) {
    return <>Loading...</>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orçamento</CardTitle>
      </CardHeader>
      <CardContent>
        <BudgetCard status={status} car={car} observation={observation} />

        {allowEditBudget && <BudgetViewForm />}

        <BudgetTable allowActions={allowEditBudget} />

        <BudgetViewActions />
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
