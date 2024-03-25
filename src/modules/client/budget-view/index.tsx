import { useGetBudget } from '@core/service/budget';
import BudgetCard from '@modules/client/budget-card';
import Container from '@shared/components/container';

export default function ClientBudgetView() {
  const { data: budget } = useGetBudget();

  if (!budget) {
    return <>Loading...</>;
  }

  const { status, car } = budget;

  return (
    <Container title="Orçamento">
      <BudgetCard status={status} car={car} />
    </Container>
  );
}
