import { useGetBudget } from '@core/service/budget';
import { BudgetViewContext } from '@core/store/context/BudgetViewContext';

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
