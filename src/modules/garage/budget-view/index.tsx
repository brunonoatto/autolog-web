import { BudgetViewProvider } from '@core/store/context/BudgetViewContext';
import useBudgetView from '@core/store/context/hooks/useBudgetViewContext';
import BudgetViewActions from '@modules/garage/budget-view/actions';
import BudgetViewForm from '@modules/garage/budget-view/form';
import BudgetCard from '@shared/components/budget-card';
import BudgetTable from '@shared/components/budget-table';
import Container from '@shared/components/container';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

function GarageBudgetViewContent() {
  const { budget } = useBudgetView();
  const { status, car, observation } = budget || {};

  const allowEditBudget = status === BudgetStatusEnum.MakingBudget;

  if (!budget) {
    return <>Loading...</>;
  }

  return (
    <Container title="Orçamento">
      <Container.Content>
        <BudgetCard status={status} car={car} observation={observation} />

        {allowEditBudget && <BudgetViewForm />}

        <BudgetTable allowActions={allowEditBudget} />

        <BudgetViewActions />
      </Container.Content>
    </Container>
  );
}

export default function GarageBudgetView() {
  return (
    <BudgetViewProvider>
      <GarageBudgetViewContent />
    </BudgetViewProvider>
  );
}
