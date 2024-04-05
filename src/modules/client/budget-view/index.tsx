import { useGetBudget } from '@core/service/budget';
import { BudgetViewProvider } from '@core/store/context/BudgetViewContext';
import BudgetViewActionButtons from '@modules/client/budget-view/action-buttons';
import BudgetCard from '@shared/components/budget-card';
import BudgetTable from '@shared/components/budget-table';
import Container from '@shared/components/container';

function ClientBudgetViewContent() {
  const { data: budget } = useGetBudget();

  const { status, car } = budget || {};

  if (!budget) {
    return <>Loading...</>;
  }

  return (
    <Container title="Orçamento">
      <Container.Content>
        <BudgetCard status={status} car={car} />

        <BudgetTable />
      </Container.Content>

      <Container.Footer>
        <BudgetViewActionButtons />
      </Container.Footer>
    </Container>
  );
}

export default function GarageBudgetView() {
  return (
    <BudgetViewProvider>
      <ClientBudgetViewContent />
    </BudgetViewProvider>
  );
}
