import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { yup, yupValidators } from '@shared/form-validations/index';
import FormCard from '@core/layout/form/form-card';
import InputForm from '@shared/components/form/input';
import BrandSelect from '@shared/components/selects/brand-select';
import ModelSelect from '@shared/components/selects/model-select';
import CarStatusSelect from '@shared/components/selects/card-status-select';
import { StatusCarEnum } from '@core/models/car';
import Textarea from '@shared/design-system/textarea';

const schema = yup
  .object({
    license: yupValidators.StringValidator().required().max(10, 'Placa deve ter no máximo 10 caracteres').uppercase(),
    brand: yupValidators.StringValidator().required(),
    model: yupValidators.StringValidator().required(),
    year: yupValidators.NumberValidator().required().integer(),
    status: yupValidators.NumberValidator().required(),
    observation: yupValidators.StringValidator(),
  })
  .required();

type TRegisterProvicerFormType = yup.InferType<typeof schema>;

const AddCar = () => {
  const form = useForm({
    mode: 'onChange',
    defaultValues: { status: StatusCarEnum.WaitingBudget },
    resolver: yupResolver(schema),
  });
  const { register, watch } = form;

  const brandId = watch('brand');

  const onSubmit: SubmitHandler<TRegisterProvicerFormType> = (data) => console.log(data);

  return (
    <FormCard form={form} onSubmit={onSubmit} title="Aicionar veiculo">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InputForm label="Placa" {...register('license')} />
        <BrandSelect label="Montadora" {...register('brand')} />
        <ModelSelect label="Modelo" brandId={brandId} {...register('model')} />
        <InputForm label="Ano" type="number" {...register('year')} />
        <CarStatusSelect label="Status" {...register('status')} />
        <Textarea label="Observação" {...register('observation')} className="h-20" />
      </div>
    </FormCard>
  );
};

export default AddCar;
