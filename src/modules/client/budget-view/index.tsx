import { useGetBudget } from '@core/service/budget';
import Container from '@shared/components/container';
import BudgetCard from '@modules/client/budget-card';
import BudgetViewTable from '@modules/garage/budget-view/table';
import BudgetActionButtons from '@modules/client/budget-view/action-buttons';

export default function ClientBudgetView() {
  const { data: budget } = useGetBudget();

  if (!budget) {
    return <>Loading...</>;
  }

  const { os, status, car } = budget;

  return (
    <Container title="Orçamento">
      <BudgetCard status={status} car={car} />

      <BudgetViewTable />

      <BudgetActionButtons status={status} os={os} />
    </Container>
  );
}
