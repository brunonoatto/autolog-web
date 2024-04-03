import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { createContext } from 'react';

import type { TGetBudgetResponse } from '@core/api/budget/types';
import { useGetBudget } from '@core/service/budget';

type TGarageBudgetViewValue = {
  budget?: TGetBudgetResponse;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<TGetBudgetResponse, Error>>;
};

export const GarageBudgetViewContext = createContext({} as TGarageBudgetViewValue);

export function GarageBudgetViewProvider({ children }: { children: React.ReactNode }) {
  const { data: budget, refetch } = useGetBudget();

  return (
    <GarageBudgetViewContext.Provider
      value={{
        budget,
        refetch,
      }}
    >
      {children}
    </GarageBudgetViewContext.Provider>
  );
}
