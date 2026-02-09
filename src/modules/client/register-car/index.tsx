import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateCar } from '@core/service/car';
import { useLoadingStore } from '@core/store/hooks';
import Form from '@shared/components/form';
import FormField from '@shared/components/form/form-field';
import LicenseInput from '@shared/components/form/license-input';
import { Input } from '@shared/design-system/ui/input';
import { useToast } from '@shared/design-system/ui/use-toast';
import { zodValidators } from '@shared/form-validations';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

const registerCarSchema = z
  .object({
    license: zodValidators.String().toUpperCase(),
    model: zodValidators.String(),
    year: zodValidators
      .Int()
      .min(1900, 'Ano deve ser maior que 1900')
      .max(new Date().getFullYear(), `Ano deve ser menor ou igual que o atual`),
  })
  .strict();

export type TRegisterCarFormType = z.infer<typeof registerCarSchema>;

export default function ClientRegisterCar() {
  const navigate = useNavigateCustom();
  const { toast } = useToast();
  const { mutate } = useCreateCar();
  const loading = useLoadingStore((prop) => prop.loading);

  const form = useForm<TRegisterCarFormType>({
    resolver: zodResolver(registerCarSchema),
  });
  const { control } = form;

  const handleValid: SubmitHandler<TRegisterCarFormType> = (formValues) => {
    loading(true);

    mutate(formValues, {
      onSuccess: () => {
        toast.success('Veículo cadastrado com sucesso!');
        navigate('/cliente');
      },
      onSettled: () => loading(false),
    });
  };

  return (
    <Form form={form} title="Cadastro de veículo" onValid={handleValid}>
      <FormField className="col-span-full" control={control} name="license" label="Placa">
        <LicenseInput />
      </FormField>

      <FormField control={control} name="model" label="Modelo">
        <Input placeholder="Informe o modelo do veículo" className="uppercase" />
      </FormField>

      <FormField control={control} name="year" label="Ano">
        <Input type="number" placeholder="Informe o ano do veículo" />
      </FormField>
    </Form>
  );
}
