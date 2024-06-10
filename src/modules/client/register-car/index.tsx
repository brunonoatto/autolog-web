import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateCar } from '@core/service/car';
import { useListBrands, useListModelsBrand } from '@core/service/fipe';
import { useLoadingStore } from '@core/store/hooks';
import BrandCombobox from '@shared/components/combobox/brand-combobox';
import ModelCombobox from '@shared/components/combobox/model-combobox';
import Form from '@shared/components/form';
import FormField from '@shared/components/form/form-field';
import LicenseInput from '@shared/components/form/license-input';
import { Input } from '@shared/design-system/ui/input';
import { useToast } from '@shared/design-system/ui/use-toast';
import { zodValidators } from '@shared/form-validations';

const registerCarSchema = z
  .object({
    license: zodValidators.String().toUpperCase(),
    brand: zodValidators.String(),
    model: zodValidators.String(),
    year: zodValidators
      .Int()
      .min(1900, 'Ano deve ser maior que 1900')
      .max(new Date().getFullYear(), `Ano deve ser menor ou igual que o atual`),
  })
  .strict();

export type TRegisterCarFormType = z.infer<typeof registerCarSchema>;

export default function ClientRegisterCar() {
  const { toast } = useToast();
  const { mutate } = useCreateCar();
  const loading = useLoadingStore((prop) => prop.loading);

  const form = useForm<TRegisterCarFormType>({
    resolver: zodResolver(registerCarSchema),
  });
  const { control, resetField, watch } = form;

  const brandId = watch('brand');

  const { data: listBrands } = useListBrands();
  const { data: listModels } = useListModelsBrand(brandId);

  const handleBrandChanged = () => {
    resetField('model');
  };

  const handleValid: SubmitHandler<TRegisterCarFormType> = (formValues) => {
    loading(true);

    // TODO: transformar essa lógica em hook
    const brand = listBrands?.find((b) => b.code === formValues.brand)?.name;
    const model = listModels?.find((b) => b.code === formValues.model)?.name;

    if (!brand || !model) {
      toast.error('Informações do veículo não encontradas.');
      return;
    }

    mutate(
      { ...formValues, brand, model },
      {
        onSuccess: () => {
          toast.success('Veículo cadastrado com sucesso!');
        },
        onSettled: () => loading(false),
      },
    );
  };

  return (
    <Form form={form} title="Cadastro de veículo" onValid={handleValid}>
      <FormField className="col-span-full" control={control} name="license" label="Placa">
        <LicenseInput />
      </FormField>

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
    </Form>
  );
}
