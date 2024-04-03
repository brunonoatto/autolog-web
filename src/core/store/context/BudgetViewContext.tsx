import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { createContext } from 'react';

import type { TGetBudgetResponse } from '@core/api/budget/types';
import { useGetBudget } from '@core/service/budget';

type TBudgetViewValue = {
  budget?: TGetBudgetResponse;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<TGetBudgetResponse, Error>>;
};

export const BudgetViewContext = createContext({} as TBudgetViewValue);

export function BudgetViewProvider({ children }: { children: React.ReactNode }) {
  const { data: budget, refetch } = useGetBudget();

  return (
    <BudgetViewContext.Provider
      value={{
        budget,
        refetch,
      }}
    >
      {children}
    </BudgetViewContext.Provider>
  );
}
