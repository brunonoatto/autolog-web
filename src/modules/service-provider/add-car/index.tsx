import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import Form from '@layout/form';
import { yup, yupValidators } from '@shared/form-validations/index';
import InputForm from '@shared/components/form/input';
import CarStatusSelect from '@shared/components/selects/card-status-select';
import { StatusCarEnum } from '@shared/types/statusCar';
import Textarea from '@shared/design-system/textarea';
import { useAddBudget } from '@core/service/budget';
import { useLoadingStore } from '@core/store/hooks';
import CarInfos from '@modules/service-provider/add-car/card-infos';
import { useListBrands, useListModelsBrand } from '@core/service/fipe';

const schema = yup
  .object({
    name: yupValidators.StringValidator().required(),
    phone: yupValidators.StringValidator().required(),
    cpf_cnpj: yupValidators.StringValidator().required(),
    license: yupValidators.StringValidator().required(),
    brand: yupValidators.StringValidator().required(),
    model: yupValidators.StringValidator().required(),
    year: yupValidators.NumberValidator().required().integer(),
    status: yupValidators.NumberValidator().required(),
    observation: yupValidators.StringValidator(),
  })
  .required();

export type TRegisterCarFormType = yup.InferType<typeof schema>;

export default function AddCar() {
  const navigate = useNavigate();

  const loading = useLoadingStore((props) => props.loading);

  const { mutate } = useAddBudget();

  const form = useForm({
    defaultValues: { status: StatusCarEnum.WaitingBudget },
    resolver: yupResolver(schema),
  });
  const { register, watch } = form;

  const brandId = watch('brand');
  const { data: listBrands } = useListBrands();
  const { data: listModels } = useListModelsBrand(brandId);

  const handleSuccess = () => {
    navigate('/prestador-servico/dashboard');
  };

  const onSubmit: SubmitHandler<TRegisterCarFormType> = async (formValues) => {
    console.log('onSubmit');
    loading(true);

    // TODO: transformar essa lógica em hook
    const brand = listBrands?.find((b) => b.code === formValues.brand)?.name;
    const model = listModels?.find((b) => b.code === formValues.model)?.name;

    mutate(
      { ...formValues, brand, model },
      {
        onSuccess: handleSuccess,
        onSettled: () => loading(false),
      },
    );
  };

  return (
    <Form form={form} onSubmit={onSubmit} title="Adicionar veiculo" className="m-2 md:m-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InputForm
          label="Nome Cliente"
          labelProps={{ className: 'col-span-full' }}
          {...register('name')}
        />
        <InputForm label="CPF/CNPJ" {...register('cpf_cnpj')} />
        <InputForm label="Telefone" {...register('phone')} />

        <CarInfos />

        <CarStatusSelect label="Status" {...register('status')} />
        <Textarea
          labelProps={{ className: 'col-span-full' }}
          {...{ className: 'h-20', ...register('observation') }}
          label="Observação"
        />
      </div>
    </Form>
  );
}
