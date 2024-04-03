import { useGetBudget } from '@core/service/budget';
import BudgetActionButtons from '@modules/client/budget-view/action-buttons';
import BudgetViewTable from '@modules/garage/budget-view/table';
import BudgetCard from '@shared/components/budget-card';
import Container from '@shared/components/container';

export default function ClientBudgetView() {
  const { data: budget } = useGetBudget();

  const { status, car } = budget || {};

  if (!budget) {
    return <>Loading...</>;
  }

  return (
    <Container title="Orçamento">
      <BudgetCard status={status} car={car} />

      <BudgetViewTable />

      <BudgetActionButtons />
    </Container>
  );
}
