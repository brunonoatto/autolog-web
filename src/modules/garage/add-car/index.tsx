import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ServiceApi } from '@core/api';
import { TClientResponse } from '@core/api/client/types';
import { ROUTES_PATH } from '@core/router/consts';
import { useAddBudget } from '@core/service/budget';
import { useListBrands, useListModelsBrand } from '@core/service/fipe';
import { useLoadingStore } from '@core/store/hooks';
import Form from '@layout/form';
import CarInfos from '@modules/garage/add-car/card-infos';
import InputForm from '@shared/components/form/input';
import Modal from '@shared/design-system/modal';
import Textarea from '@shared/design-system/textarea';
import { yup, yupValidators } from '@shared/form-validations/index';

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
  const [selectedClient, setSelectedClient] = useState<TClientResponse | undefined>();
  const [generateOS, setGenerateOS] = useState('');
  const navigate = useNavigate();
  const { mutate } = useAddBudget();
  const loading = useLoadingStore((state) => state.loading);

  const form = useForm({
    resolver: yupResolver(schema),
  });
  const { register, watch, handleSubmit, getValues, setValue } = form;

  const brandId = watch('brand');
  const { data: listBrands } = useListBrands();
  const { data: listModels } = useListModelsBrand(brandId);

  const handleClearClientSelected = () => {
    setValue('name', '');
    setValue('phone', '');
    setSelectedClient(undefined);
  };

  const handleSuccessConfirm = () => {
    navigate(`${ROUTES_PATH.garageBudgetView}/${generateOS}`);
  };

  const handleSuccessCancel = () => {
    navigate(ROUTES_PATH.garageDashboard);
  };

  const handleValid: SubmitHandler<TRegisterCarFormType> = async (formValues) => {
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

  const handleCpfBlur = async () => {
    const { cpf_cnpj } = getValues();
    if (cpf_cnpj.length === 11) {
      try {
        const { data: clientData } = await ServiceApi.ClientApi.get({ cpf: cpf_cnpj });
        setSelectedClient(clientData);

        setValue('name', clientData.name);
        setValue('phone', clientData.phone);
      } catch {
        handleClearClientSelected();
      }
    } else {
      handleClearClientSelected();
    }
  };

  return (
    <>
      <Form
        form={form}
        onSubmit={handleSubmit(handleValid)}
        title="Adicionar Orçamento"
        icon="BudgetLoadingIcon"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputForm label="CPF/CNPJ" {...register('cpf_cnpj', { onBlur: handleCpfBlur })} />
          <InputForm
            label="Nome Cliente"
            labelProps={{ className: 'lg:row-start-2 md:col-span-2' }}
            disabled={!!selectedClient}
            {...register('name')}
          />
          <InputForm
            label="Telefone"
            labelProps={{ className: 'lg:row-start-2' }}
            disabled={!!selectedClient}
            {...register('phone')}
          />

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
