import { useFormContext } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import useBudgetAddContext from '@core/store/context/hooks/useBudgetAdd';
import type { TBudgetAddFormType } from '@core/store/context/types/budget-add';
import ClientCars from '@modules/garage/budget-add/car-fields/client-cars';
import BrandCombobox from '@shared/components/combobox/brand-combobox';
import ModelCombobox from '@shared/components/combobox/model-combobox';
import FormField from '@shared/components/form/form-field';
import LicenseInput from '@shared/components/form/license-input';
import LoadingIcon from '@shared/components/loading-icon';
import { CardTitle } from '@shared/design-system/ui/card';
import { Input } from '@shared/design-system/ui/input';

export default function CarFields() {
  const isLoadingCar = useBudgetAddContext((prop) => prop.isLoadingCar);
  const selectedCar = useBudgetAddContext((prop) => prop.selectedCar);
  const handleLoadCar = useBudgetAddContext((prop) => prop.handleLoadCar);
  const handleClearSelectedClientCar = useBudgetAddContext(
    (prop) => prop.handleClearSelectedClientCar,
  );

  const handleLoadCarDebounce = useDebouncedCallback(handleLoadCar, 300);

  const { control, watch, resetField } = useFormContext<TBudgetAddFormType>();

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
          <FormField className="col-span-full" control={control} name="license" label="Placa">
            <LicenseInput onChange={handleLicenseChange} />
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
