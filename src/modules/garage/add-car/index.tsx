import { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { useLoadingStore } from '@core/store/hooks';
import { useListBrands, useListModelsBrand } from '@core/service/fipe';
import { ROUTES_PATH } from '@core/router/consts';
import Form from '@layout/form';
import { yup, yupValidators } from '@shared/form-validations/index';
import InputForm from '@shared/components/form/input';
import Textarea from '@shared/design-system/textarea';
import Modal from '@shared/design-system/modal';
import { useAddBudget } from '@core/service/budget';
import CarInfos from '@modules/garage/add-car/card-infos';

const schema = yup
  .object({
    name: yupValidators.StringValidator().required(),
    phone: yupValidators.StringValidator().required(),
    cpf_cnpj: yupValidators.StringValidator().required(),
    license: yupValidators.StringValidator().required(),
    brand: yupValidators.StringValidator().required(),
    model: yupValidators.StringValidator().required(),
    year: yupValidators.NumberValidator().required().integer(),
    observation: yupValidators.StringValidator(),
  })
  .required();

export type TRegisterCarFormType = yup.InferType<typeof schema>;

export default function AddCar() {
  const [generateOS, setGenerateOS] = useState('');
  const navigate = useNavigate();
  const { mutate } = useAddBudget();
  const loading = useLoadingStore((props) => props.loading);

  const form = useForm({
    resolver: yupResolver(schema),
  });
  const { register, watch, handleSubmit } = form;

  const brandId = watch('brand');
  const { data: listBrands } = useListBrands();
  const { data: listModels } = useListModelsBrand(brandId);

  const handleSuccessConfirm = () => {
    navigate(`${ROUTES_PATH.bugget}/${generateOS}`);
  };

  const handleSuccessCancel = () => {
    navigate(ROUTES_PATH.dashboard);
  };

  const handleValid: SubmitHandler<TRegisterCarFormType> = async (formValues) => {
    console.log('onSubmit', { formValues });
    loading(true);

    // TODO: transformar essa lógica em hook
    const brand = listBrands?.find((b) => b.code === formValues.brand)?.name;
    const model = listModels?.find((b) => b.code === formValues.model)?.name;

    mutate(
      { ...formValues, brand, model },
      {
        onSuccess: (budget) => setGenerateOS(budget.os),
        onSettled: () => loading(false),
      },
    );
  };

  return (
    <>
      <Form
        form={form}
        onSubmit={handleSubmit(handleValid)}
        title="Adicionar veiculo"
        className="m-2 md:m-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputForm
            label="Nome Cliente"
            labelProps={{ className: 'col-span-full' }}
            {...register('name')}
          />
          <InputForm label="CPF/CNPJ" {...register('cpf_cnpj')} />
          <InputForm label="Telefone" {...register('phone')} />

          <CarInfos />

          <Textarea
            labelProps={{ className: 'col-span-full' }}
            className="h-20"
            label="Observação"
            {...register('observation')}
          />
        </div>
      </Form>
      <Modal
        open={!!generateOS}
        title="Veículo cadastrado com sucesso!"
        confirmText="Editar orçamento"
        onConfirmClick={handleSuccessConfirm}
        cancelText="Ir para Dashboard"
        onCancelClick={handleSuccessCancel}
      >
        <p>Você deseja editar o Orçamento?</p>
      </Modal>
    </>
  );
}
