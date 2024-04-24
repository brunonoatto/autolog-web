import { ContextSelector, useContextSelector } from '@fluentui/react-context-selector';

import { BudgetAddContext, TBudgetAddValue } from '@core/store/context/BudgetAddContext';

export default function useBudgetAddContext<T>(selector: ContextSelector<TBudgetAddValue, T>) {
  return useContextSelector(BudgetAddContext, selector);
}
