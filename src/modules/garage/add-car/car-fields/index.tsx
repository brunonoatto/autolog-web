import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import { ServiceApi } from '@core/api';
import type { TGarageAddCarFormType } from '@core/store/context/GarageAddCarContext';
import useGarageAddCarContext from '@core/store/context/hooks/useGarageAddCar';
import ClientCars from '@modules/garage/add-car/car-fields/client-cars';
import BrandCombobox from '@shared/components/combobox/brand-combobox';
import ModelCombobox from '@shared/components/combobox/model-combobox';
import FormField from '@shared/components/form/form-field';
import { CardTitle } from '@shared/design-system/ui/card';
import { Input } from '@shared/design-system/ui/input';

export default function CarFields() {
  const selectedCar = useGarageAddCarContext((prop) => prop.selectedCar);
  const handleSelectedClientCar = useGarageAddCarContext((prop) => prop.handleSelectedClientCar);
  const handleClearSelectedClientCar = useGarageAddCarContext(
    (prop) => prop.handleClearSelectedClientCar,
  );

  // TODO: fazer o loading enquanto pesquisa pela placa
  const [_loading, setLoading] = useState(false);

  const { control, watch, reset, setValue } = useFormContext<TGarageAddCarFormType>();

  const brandId = watch('brand');

  const handleGetCar = async (license: string) => {
    setLoading(true);

    try {
      const { data } = await ServiceApi.CarApi.get(license);
      handleSelectedClientCar(data);

      reset({
        brand: data?.brand,
        model: data?.model,
        year: data?.year,
      });
    } finally {
      setLoading(false);
    }
  };

  const debounce = useDebouncedCallback(handleGetCar, 500);

  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    handleClearSelectedClientCar();

    if (value?.length >= 7) debounce(value);
  };

  const handleBrandChanged = () => {
    setValue('model', '');
  };

  return (
    <div className="col-span-full space-y-2">
      <CardTitle icon="car" size="lg">
        Dados do veículo
      </CardTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ClientCars />

        <FormField className="col-span-full w-36" control={control} name="license" label="Placa">
          <Input
            className="text-xl font-bold uppercase"
            maxLength={10}
            onChange={handleLicenseChange}
          />
        </FormField>

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
              <Input type="number" />
            </FormField>
          </>
        )}
      </div>
    </div>
  );
}
