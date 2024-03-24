import { useParams } from 'react-router-dom';

import BudgetView from '@modules/garage/budget/view';
import SearchBudgets from '@modules/garage/budget/search';
import ListBudgets from '@modules/garage/budget/list';

export default function Budget() {
  const { os: osParam } = useParams();

  return osParam ? (
    <BudgetView />
  ) : (
    <>
      <SearchBudgets />
      <ListBudgets />
    </>
  );
}
