import { Car } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import useBudgetAddContext from '@core/store/context/BudgetAddContext/hook';
import type { TBudgetAddFormType } from '@core/store/context/types/budget-add';
import ClientCars from '@modules/garage/budget-add/car-fields/client-cars';
import BrandCombobox from '@shared/components/combobox/brand-combobox';
import ModelCombobox from '@shared/components/combobox/model-combobox';
import FormField from '@shared/components/form/form-field';
import LicenseInput from '@shared/components/form/license-input';
import { CardTitle } from '@shared/design-system/ui/card';
import { Input } from '@shared/design-system/ui/input';

export default function CarFields() {
  const handleLoadCar = useBudgetAddContext((prop) => prop.handleLoadCar);
  const handleClearSelectedClientCar = useBudgetAddContext(
    (prop) => prop.handleClearSelectedClientCar,
  );

  const handleLoadCarDebounce = useDebouncedCallback(handleLoadCar, 300);

  const { control, watch, resetField } = useFormContext<TBudgetAddFormType>();

  const selectedCarId = watch('car.id');
  const brandId = watch('car.brand');

  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    handleClearSelectedClientCar(false);
    handleLoadCarDebounce(value);
  };

  const handleBrandChanged = () => {
    resetField('car.model');
  };

  return (
    <div className="col-span-full space-y-2">
      <CardTitle icon={Car} size="lg">
        Dados do veículo
      </CardTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <ClientCars />

        {!selectedCarId && (
          <>
            {/* Precisa renderizar o field car.id como hidden para funcionar o resetFields do hookForm */}
            <FormField className="hidden" control={control} name="car.id">
              <Input />
            </FormField>

            <FormField className="col-span-full" control={control} name="car.license" label="Placa">
              <LicenseInput onChange={handleLicenseChange} />
            </FormField>

            <BrandCombobox
              control={control}
              name="car.brand"
              label="Montadora"
              onChange={handleBrandChanged}
            />

            <ModelCombobox control={control} name="car.model" label="Modelo" brandId={brandId} />

            <FormField control={control} name="car.year" label="Ano">
              <Input type="number" placeholder="Informe o ano do veículo" />
            </FormField>
          </>
        )}
      </div>
    </div>
  );
}
