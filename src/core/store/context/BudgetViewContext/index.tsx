import { createContext } from 'react';

import { BudgetComplete } from '@core/models/budget/BudgetComplete';
import { useGetBudget } from '@core/service/budget';

type TBudgetViewValue = {
  budget?: BudgetComplete;
};

export const BudgetViewContext = createContext({} as TBudgetViewValue);

export function BudgetViewProvider({ children }: { children: React.ReactNode }) {
  const { budget } = useGetBudget();

  return (
    <BudgetViewContext.Provider
      value={{
        budget,
      }}
    >
      {children}
    </BudgetViewContext.Provider>
  );
}
