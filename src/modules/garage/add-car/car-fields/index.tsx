import { useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { useDebouncedCallback } from 'use-debounce';

import type { TGarageAddCarFormType } from '@core/store/context/GarageAddCarContext';
import useGarageAddCarContext from '@core/store/context/hooks/useGarageAddCar';
import ClientCars from '@modules/garage/add-car/car-fields/client-cars';
import BrandCombobox from '@shared/components/combobox/brand-combobox';
import ModelCombobox from '@shared/components/combobox/model-combobox';
import FormField from '@shared/components/form/form-field';
import LoadingIcon from '@shared/components/loading-icon';
import { CardTitle } from '@shared/design-system/ui/card';
import { Input } from '@shared/design-system/ui/input';

export default function CarFields() {
  const isLoadingCar = useGarageAddCarContext((prop) => prop.isLoadingCar);
  const selectedCar = useGarageAddCarContext((prop) => prop.selectedCar);
  const handleLoadCar = useGarageAddCarContext((prop) => prop.handleLoadCar);
  const handleClearSelectedClientCar = useGarageAddCarContext(
    (prop) => prop.handleClearSelectedClientCar,
  );

  const handleLoadCarDebounce = useDebouncedCallback(handleLoadCar, 300);

  const { control, watch, resetField } = useFormContext<TGarageAddCarFormType>();

  const license = watch('license');
  const brandId = watch('brand');

  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    handleClearSelectedClientCar();

    handleLoadCarDebounce(value);
  };

  const handleBrandChanged = () => {
    resetField('model');
  };

  return (
    <div className="col-span-full space-y-2">
      <CardTitle icon="car" size="lg">
        Dados do veículo
      </CardTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ClientCars />

        <div className="flex items-start gap-2 col-span-full">
          <FormField control={control} name="license" label="Placa">
            <Input
              className={twMerge(`${license && 'text-xl font-bold uppercase'} w-48`)}
              maxLength={10}
              onChange={handleLicenseChange}
              placeholder="Informe a placa do veículo"
            />
          </FormField>

          {/* TODO: pensar numa forma de mandar o isLoading para o FielField */}
          {isLoadingCar && <LoadingIcon className="mt-10" />}
        </div>

        {selectedCar ? (
          <p className="col-span-full">
            {selectedCar.brand} - {selectedCar.model} {selectedCar.year}
          </p>
        ) : (
          <>
            <BrandCombobox
              control={control}
              name="brand"
              label="Montadora"
              onChange={handleBrandChanged}
            />
            <ModelCombobox control={control} name="model" label="Modelo" brandId={brandId} />

            <FormField control={control} name="year" label="Ano">
              <Input type="number" placeholder="Informe o ano do veículo" />
            </FormField>
          </>
        )}
      </div>
    </div>
  );
}
