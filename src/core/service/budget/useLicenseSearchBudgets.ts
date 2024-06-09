import { useSearchParams } from 'react-router-dom';

import { useListBudgetsCar } from '@core/service/budget/useListBudgetsCar';

export const useLicenseSearchBudgets = () => {
  const [params] = useSearchParams();

  const license = params.get('license');

  return useListBudgetsCar(license || '');
};
