import { useContext } from 'react';

import { GarageBudgetViewContext } from '@core/store/context/GarageBudgetViewContext';

export default function useGarageBudgetView() {
  return useContext(GarageBudgetViewContext);
}
