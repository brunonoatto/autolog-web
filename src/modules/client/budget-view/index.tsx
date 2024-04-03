import { useGetBudget } from '@core/service/budget';
import BudgetCard from '@modules/client/budget-card';
import BudgetActionButtons from '@modules/client/budget-view/action-buttons';
import BudgetViewTable from '@modules/garage/budget-view/table';
import Container from '@shared/components/container';

export default function ClientBudgetView() {
  const { data: budget } = useGetBudget();

  if (!budget) {
    return <>Loading...</>;
  }

  return (
    <Container title="Orçamento">
      <BudgetCard />

      <BudgetViewTable />

      <BudgetActionButtons />
    </Container>
  );
}
