import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAddDashboardItem } from '@core/service/autolog';
import FormCard from '@core/layout/form/form-card';
import { yup, yupValidators } from '@shared/form-validations/index';
import InputForm from '@shared/components/form/input';
import BrandSelect from '@shared/components/selects/brand-select';
import ModelSelect from '@shared/components/selects/model-select';
import CarStatusSelect from '@shared/components/selects/card-status-select';
import { StatusCarEnum } from '@shared/types/statusCar';
import Textarea from '@shared/design-system/textarea';
import InputNumberForm from '@shared/components/form/inputNumber';

const schema = yup
  .object({
    license: yupValidators.StringValidator().required(),
    brand: yupValidators.StringValidator().required(),
    model: yupValidators.StringValidator().required(),
    year: yupValidators.NumberValidator().required().integer(),
    status: yupValidators.NumberValidator().required(),
    observation: yupValidators.StringValidator(),
  })
  .required();

type TRegisterProvicerFormType = yup.InferType<typeof schema>;

const AddCar = () => {
  const navigate = useNavigate();
  const { mutate: addDashboardItem } = useAddDashboardItem();
  const form = useForm({
    mode: 'onChange',
    defaultValues: { status: StatusCarEnum.WaitingBudget },
    resolver: yupResolver(schema),
  });
  const { register, watch } = form;

  const brandId = watch('brand');

  const onSubmit: SubmitHandler<TRegisterProvicerFormType> = async (formValues) => {
    await addDashboardItem(formValues);
    navigate('/prestador-servico/dashboard');
  };

  return (
    <FormCard form={form} onSubmit={onSubmit} title="Aicionar veiculo">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InputForm
          label="Placa"
          labelProps={{ className: 'col-span-full' }}
          inputProps={{
            className: 'w-36 h-8 text-xl font-bold uppercase',
            ...register('license'),
            maxLength: 10,
          }}
        />
        <BrandSelect label="Montadora" {...register('brand')} />
        <ModelSelect label="Modelo" brandId={brandId} {...register('model')} />
        <InputNumberForm label="Ano" inputProps={{ ...register('year') }} />
        <CarStatusSelect label="Status" {...register('status')} />
        <Textarea
          labelProps={{ className: 'col-span-full' }}
          inputProps={{ className: 'h-20', ...register('observation') }}
          label="Observação"
        />
      </div>
    </FormCard>
  );
};

export default AddCar;
