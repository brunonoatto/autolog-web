import { useSearchParams } from 'react-router-dom';

import { useListBudgetsCar } from '@core/service/budget';

export const useLicenseSearchBudgets = () => {
  const [searchParams] = useSearchParams();

  const license = searchParams.get('license') || '';

  return useListBudgetsCar(license);
};
