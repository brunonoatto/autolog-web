import { useAddBudgetItem } from '@core/service/budget-items';
import { BugdetItemForm } from '@shared/components/budget-item-form';

export function AddBugdetItemForm() {
  const { mutate: mutateAddBudgetItem } = useAddBudgetItem();

  return <BugdetItemForm onSubmit={mutateAddBudgetItem} />;
}
