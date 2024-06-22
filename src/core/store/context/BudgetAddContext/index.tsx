import { createContext } from '@fluentui/react-context-selector';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ServiceApi } from '@core/api';
import type { TCar } from '@core/api/car/types';
import type { TClientResponse } from '@core/api/client/types';
import { budgetAddSchema, TBudgetAddFormType } from '@core/store/context/types/budget-add';
import { useToast } from '@shared/design-system/ui/use-toast';

export type TBudgetAddValue = {
  isLoadingClient: boolean;
  isLoadingCar: boolean;
  selectedClientCars: TCar[];
  allowSelectCar: boolean;
  handleLoadClient: (cpfCnpj: string) => Promise<void>;
  handleLoadCar: (license: string) => Promise<void>;
  handleSelectedClientCar: (car: TCar) => void;
  handleClearSelectedClient: () => void;
  handleClearSelectedClientCar: () => void;
  setAllowSelectCar: (allow: boolean) => void;
};

export const BudgetAddContext = createContext({} as TBudgetAddValue);

export function BudgetAddProvider({ children }: { children: React.ReactNode }) {
  const [allowSelectCar, setAllowSelectCar] = useState(false);
  const [selectedClientCars, setSelectedClientCars] = useState<TCar[]>([]);
  const [isLoadingClient, setIsLoadingClient] = useState(false);
  const [isLoadingCar, setIsLoadingCar] = useState(false);

  const { toast } = useToast();

  const form = useForm<TBudgetAddFormType>({
    resolver: zodResolver(budgetAddSchema),
  });
  const { setValue, setFocus, resetField, getValues } = form;

  const onLoadClient = async (cpfCnpj: string) => {
    if (cpfCnpj.length === 11 || cpfCnpj.length === 14) {
      setIsLoadingClient(true);

      try {
        const clientData = await ServiceApi.ClientApi.get({
          cpfCnpj,
          withCars: true,
        });

        if (!clientData) {
          onClearSelectedClient();
          return;
        }

        onSelectedClient(clientData);
      } catch {
        onClearSelectedClient();
      } finally {
        setIsLoadingClient(false);
      }
    } else {
      onClearSelectedClient();
    }
  };

  const onLoadCar = async (license: string) => {
    if (!license || license.length < 7) return;

    setIsLoadingCar(true);

    try {
      const car = await ServiceApi.CarApi.get(license, true);

      if (!car) return;

      const selectedClientId = getValues('client.id');
      if (selectedClientId && car && selectedClientId !== car.clientId) {
        resetField('car');

        toast.warning('Veículo pertence a um proprietário diferente do selecionado');

        return;
      }

      onSelectedClientCar(car);
    } finally {
      setIsLoadingCar(false);
    }
  };

  const onSelectedClient = (client: TClientResponse) => {
    setFocus('car.license');

    setValue('client.id', client.id);
    setValue('client.cpfCnpj', client.cpfCnpj, { shouldValidate: true });
    setValue('client.name', client.name, { shouldValidate: true });
    setValue('client.phone', client.phone, { shouldValidate: true });

    setSelectedClientCars(client.cars || []);

    resetField('car.license');
  };

  const onClearSelectedClient = () => {
    const selectedClientId = getValues('client.id');
    if (!selectedClientId) return;

    resetField('client.id');
    resetField('client.cpfCnpj');
    resetField('client.name');
    resetField('client.phone');

    setSelectedClientCars([]);

    onClearSelectedClientCar();

    setAllowSelectCar(false);
  };

  const onSelectedClientCar = (car: TCar) => {
    setValue('car.id', car.id, { shouldValidate: true });
    setValue('car.license', car.license, { shouldValidate: true });
    setValue('car.brand', car.brand, { shouldValidate: true });
    setValue('car.model', car.model, { shouldValidate: true });
    setValue('car.year', car.year, { shouldValidate: true });

    setFocus('observation');
  };

  const onClearSelectedClientCar = () => {
    // TODO: quando chama o clear, as msgs de erro do form não aparecem mais
    // resetField('car.id', { defaultValue: true });
    // resetField('car.license', { defaultValue: true });
    // resetField('car.model', { defaultValue: true });
    // resetField('car.brand', { defaultValue: true });
    // resetField('car.year', { defaultValue: true });
    resetField('car');
  };

  return (
    <BudgetAddContext.Provider
      value={{
        isLoadingClient,
        isLoadingCar,
        selectedClientCars,
        allowSelectCar,
        handleLoadClient: onLoadClient,
        handleLoadCar: onLoadCar,
        handleSelectedClientCar: onSelectedClientCar,
        handleClearSelectedClient: onClearSelectedClient,
        handleClearSelectedClientCar: onClearSelectedClientCar,
        setAllowSelectCar,
      }}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </BudgetAddContext.Provider>
  );
}
