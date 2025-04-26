import { createContext } from '@fluentui/react-context-selector';

import { BudgetComplete } from '@core/models/budget/BudgetComplete';

export type TBudgetViewValue = {
  budget?: BudgetComplete;
};

export const BudgetViewContext = createContext({} as TBudgetViewValue);
