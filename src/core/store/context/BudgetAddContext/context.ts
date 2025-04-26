import { createContext } from '@fluentui/react-context-selector';

import { TCar } from '@core/api/car/types';

export type TBudgetAddValue = {
  isLoadingClient: boolean;
  selectedClientCars: TCar[];
  allowSelectCar: boolean;
  handleLoadClient: (cpfCnpj: string) => Promise<void>;
  handleLoadCar: (license: string) => Promise<void>;
  handleSelectedClientCar: (car: TCar) => void;
  handleClearSelectedClient: () => void;
  handleClearSelectedClientCar: (clearLicense?: boolean) => void;
  setAllowSelectCar: (allow: boolean) => void;
};

export const BudgetAddContext = createContext({} as TBudgetAddValue);
