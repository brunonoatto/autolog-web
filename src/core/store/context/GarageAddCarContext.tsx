import { createContext } from '@fluentui/react-context-selector';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { TCar } from '@core/api/car/types';
import type { TClientResponse } from '@core/api/client/types';
import { yup, yupValidators } from '@shared/form-validations';

const garageAddCarSchema = yup
  .object({
    name: yupValidators.StringValidator().required(),
    phone: yupValidators.StringValidator().required(),
    cpf_cnpj: yupValidators.StringValidator().required(),
    license: yupValidators.StringValidator().uppercase().required(),
    brand: yupValidators.StringValidator().required(),
    model: yupValidators.StringValidator().required(),
    year: yupValidators.NumberValidator().required().integer(),
    observation: yupValidators.StringValidator(),
  })
  .required();

export type TGarageAddCarFormType = yup.InferType<typeof garageAddCarSchema>;

export type TGarageAddCarValue = {
  selectedClient: TClientResponse | undefined;
  selectedCar: TCar | undefined;
  handleSelectedClient: (client: TClientResponse) => void;
  handleSelectedClientCar: (car: TCar) => void;
  handleClearSelectedClient: () => void;
  handleClearSelectedClientCar: () => void;
};

export const GarageAddCarContext = createContext({} as TGarageAddCarValue);

export function GarageAddCarProvider({ children }: { children: React.ReactNode }) {
  const [selectedClient, setSelectedClient] = useState<TClientResponse | undefined>();
  const [selectedCar, setSelectedCar] = useState<TCar | undefined>();

  const form = useForm({
    resolver: yupResolver(garageAddCarSchema),
  });
  const { setValue } = form;

  const onSelectedClient = (client: TClientResponse) => {
    setValue('name', client.name);
    setValue('phone', client.phone);

    setSelectedClient(client);
  };

  const onClearSelectedClient = () => {
    setValue('name', '');
    setValue('phone', '');

    setSelectedClient(undefined);
    onClearSelectedClientCar(true);
  };

  const onSelectedClientCar = (car: TCar) => {
    setValue('license', car.license);
    setValue('brand', car.brand);
    setValue('model', car.model);
    setValue('year', car.year);
    setSelectedCar(car);
  };

  const onClearSelectedClientCar = (clearLicense = false) => {
    if (clearLicense) {
      setValue('license', '');
    }

    setValue('brand', '');
    setValue('model', '');
    setValue('year', 0);

    setSelectedCar(undefined);
  };

  return (
    <GarageAddCarContext.Provider
      value={{
        selectedClient,
        selectedCar,
        handleSelectedClient: onSelectedClient,
        handleSelectedClientCar: onSelectedClientCar,
        handleClearSelectedClient: onClearSelectedClient,
        handleClearSelectedClientCar: onClearSelectedClientCar,
      }}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </GarageAddCarContext.Provider>
  );
}
