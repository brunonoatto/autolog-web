import { createContext } from 'react';

import { BudgetComplete } from '@core/models/budget/BudgetComplete';

export type TBudgetViewValue = {
  budget?: BudgetComplete;
  isLoading: boolean;
};

export const BudgetViewContext = createContext({} as TBudgetViewValue);
