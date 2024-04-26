import { createContext } from '@fluentui/react-context-selector';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { ServiceApi } from '@core/api';
import type { TCar } from '@core/api/car/types';
import type { TClientResponse } from '@core/api/client/types';
import { useToast } from '@shared/design-system/ui/use-toast';
import { zodValidators } from '@shared/form-validations';

const budgetAddSchema = z
  .object({
    name: zodValidators.String(),
    phone: zodValidators.String(),
    cpf_cnpj: zodValidators.CpfOrCnpj(),
    license: zodValidators.String().toUpperCase(),
    brand: zodValidators.String(),
    model: zodValidators.String(),
    year: zodValidators
      .Int()
      .min(1900, 'Ano deve ser maior que 1900')
      .max(new Date().getFullYear(), `Ano deve ser menor ou igual que o atual`),
    observation: zodValidators.StringOptional(),
  })
  .strict();

export type TBudgetAddFormType = z.infer<typeof budgetAddSchema>;

export type TBudgetAddValue = {
  isLoadingClient: boolean;
  isLoadingCar: boolean;
  selectedClient: TClientResponse | undefined;
  selectedCar: TCar | undefined;
  handleLoadClient: (cpf_cnpj: string) => Promise<void>;
  handleLoadCar: (license: string) => Promise<void>;
  handleSelectedClientCar: (car: TCar) => void;
  handleClearSelectedClient: () => void;
  handleClearSelectedClientCar: () => void;
};

export const BudgetAddContext = createContext({} as TBudgetAddValue);

export function BudgetAddProvider({ children }: { children: React.ReactNode }) {
  const [isLoadingClient, setIsLoadingClient] = useState(false);
  const [isLoadingCar, setIsLoadingCar] = useState(false);
  const [selectedClient, setSelectedClient] = useState<TClientResponse | undefined>();
  const [selectedCar, setSelectedCar] = useState<TCar | undefined>();

  const { toast } = useToast();

  const form = useForm<TBudgetAddFormType>({
    resolver: zodResolver(budgetAddSchema),
  });
  const { setValue, setFocus, resetField } = form;

  const onLoadClient = async (cpf_cnpj: string) => {
    if (cpf_cnpj.length === 11 || cpf_cnpj.length === 14) {
      setIsLoadingClient(true);

      try {
        const { data: clientData } = await ServiceApi.ClientApi.get({
          cpf_cnpj: cpf_cnpj,
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
      const car = await ServiceApi.CarApi.get(license);

      if (!car) return;

      if (selectedClient && car && selectedClient.id !== car.clientId) {
        resetField('license');

        toast({
          title: 'Veículo pertence a um proprietário diferente do selecionado',
          variant: 'warning',
        });

        return;
      }

      onSelectedClientCar(car);
    } finally {
      setIsLoadingCar(false);
    }
  };

  const onSelectedClient = (client: TClientResponse) => {
    setFocus('license');

    setValue('name', client.name, { shouldValidate: true });
    setValue('phone', client.phone, { shouldValidate: true });

    resetField('license');

    setSelectedClient(client);
  };

  const onClearSelectedClient = () => {
    if (!selectedClient) return;

    resetField('name');
    resetField('phone');

    setSelectedClient(undefined);
    onClearSelectedClientCar(true);
  };

  const onSelectedClientCar = (car: TCar) => {
    setFocus('observation');

    setValue('license', car.license, { shouldValidate: true });
    setValue('brand', car.brand, { shouldValidate: true });
    setValue('model', car.model, { shouldValidate: true });
    setValue('year', car.year, { shouldValidate: true });

    setSelectedCar(car);
  };

  const onClearSelectedClientCar = (clearLicense = false) => {
    if (!selectedCar) return;

    if (clearLicense) {
      resetField('license');
    }

    resetField('brand');
    resetField('model');
    resetField('year');

    setSelectedCar(undefined);
  };

  return (
    <BudgetAddContext.Provider
      value={{
        isLoadingClient,
        isLoadingCar,
        selectedClient,
        selectedCar,
        handleLoadClient: onLoadClient,
        handleLoadCar: onLoadCar,
        handleSelectedClientCar: onSelectedClientCar,
        handleClearSelectedClient: onClearSelectedClient,
        handleClearSelectedClientCar: onClearSelectedClientCar,
      }}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </BudgetAddContext.Provider>
  );
}
