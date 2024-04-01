import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import { ServiceApi } from '@core/api';
import type { TCar } from '@core/api/car/types';
import type { TRegisterCarFormType } from '@modules/garage/add-car';
import Container from '@shared/components/container';
import InputForm from '@shared/components/form/input';
import InputNumberForm from '@shared/components/form/inputNumber';
import BrandSelect from '@shared/components/selects/brand-select';
import ModelSelect from '@shared/components/selects/model-select';
import Input from '@shared/design-system/input';

export default function CarInfos() {
  // TODO: fazer o loading enquanto pesquisa pela placa
  const [_loading, setLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState<TCar>();
  const { register, watch, reset } = useFormContext<TRegisterCarFormType>();

  const brandId = watch('brand');

  const handleGetCar = async (license: string) => {
    setLoading(true);

    try {
      const { data } = await ServiceApi.CarApi.get(license);
      setSelectedCar(data);

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

    if (value?.length >= 7) debounce(value);
  };

  return (
    <Container className="col-span-full" title="Dados do veículo">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </Container>
  );
}
