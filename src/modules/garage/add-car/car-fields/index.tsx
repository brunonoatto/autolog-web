import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import { ServiceApi } from '@core/api';
import type { TGarageAddCarFormType } from '@core/store/context/GarageAddCarContext';
import useGarageAddCarContext from '@core/store/context/hooks/useGarageAddCar';
import ClientCars from '@modules/garage/add-car/car-fields/client-cars';
import InputForm from '@shared/components/form/input';
import InputNumberForm from '@shared/components/form/inputNumber';
import BrandSelect from '@shared/components/selects/brand-select';
import ModelSelect from '@shared/components/selects/model-select';
import Title from '@shared/components/title';
import Input from '@shared/design-system/input';

export default function CarFields() {
  const selectedCar = useGarageAddCarContext((prop) => prop.selectedCar);
  const handleSelectedClientCar = useGarageAddCarContext((prop) => prop.handleSelectedClientCar);
  const handleClearSelectedClientCar = useGarageAddCarContext(
    (prop) => prop.handleClearSelectedClientCar,
  );

  // TODO: fazer o loading enquanto pesquisa pela placa
  const [_loading, setLoading] = useState(false);

  const { register, watch, reset } = useFormContext<TGarageAddCarFormType>();

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

  return (
    <div className="col-span-full">
      <Title>Dados do veículo</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ClientCars />

        <InputForm
          label="Placa"
          labelProps={{ className: 'col-span-full' }}
          className="w-36 h-8 text-xl font-bold uppercase"
          maxLength={10}
          {...register('license', { onChange: handleLicenseChange })}
        />

        {selectedCar ? (
          <>
            <Input label="Montadora" disabled value={selectedCar.brand} />
            <Input label="Modelo" disabled value={selectedCar.model} />
            <Input label="Ano" disabled value={selectedCar.year} />
          </>
        ) : (
          <>
            <BrandSelect label="Montadora" {...register('brand')} />
            <ModelSelect label="Modelo" brandId={brandId} {...register('model')} />
            <InputNumberForm label="Ano" {...{ ...register('year') }} />
          </>
        )}
      </div>
    </div>
  );
}
