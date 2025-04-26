import { useContext } from 'react';

import { BudgetViewContext } from '@core/store/context/BudgetViewContext';

export default function useBudgetViewContext() {
  return useContext(BudgetViewContext);
}
