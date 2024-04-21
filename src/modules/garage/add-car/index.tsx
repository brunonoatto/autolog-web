import { useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ServiceApi } from '@core/api';
import { ROUTES_PATH } from '@core/router/consts';
import { useAddBudget } from '@core/service/budget';
import { useListBrands, useListModelsBrand } from '@core/service/fipe';
import {
  GarageAddCarProvider,
  type TGarageAddCarFormType,
} from '@core/store/context/GarageAddCarContext';
import useGarageAddCarContext from '@core/store/context/hooks/useGarageAddCar';
import { useLoadingStore } from '@core/store/hooks';
import Form from '@layout/form';
import CarFields from '@modules/garage/add-car/car-fields';
import InputForm from '@shared/components/form/input';
import Modal from '@shared/design-system_old/modal';
import Textarea from '@shared/design-system_old/textarea';

function AddCarContent() {
  const [generateOS, setGenerateOS] = useState('');
  const navigate = useNavigate();
  const { mutate } = useAddBudget();
  const loading = useLoadingStore((state) => state.loading);

  const handleClearClientSelected = useGarageAddCarContext(
    (prop) => prop.handleClearSelectedClient,
  );
  const selectedClient = useGarageAddCarContext((prop) => prop.selectedClient);
  const handleClearSelectedClient = useGarageAddCarContext(
    (prop) => prop.handleClearSelectedClient,
  );
  const handleSelectedClient = useGarageAddCarContext((prop) => prop.handleSelectedClient);

  const form = useFormContext<TGarageAddCarFormType>();
  const { getValues, watch, setValue, register } = form;

  const brandId = watch('brand');

  const { data: listBrands } = useListBrands();
  const { data: listModels } = useListModelsBrand(brandId);

  const handleSuccessConfirm = () => {
    navigate(`${ROUTES_PATH.garageBudgetView}/${generateOS}`);
  };

  const handleSuccessCancel = () => {
    navigate(ROUTES_PATH.garageDashboard);
  };

  const handleValid: SubmitHandler<TGarageAddCarFormType> = async (formValues) => {
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

  const handleCpfChange = async () => {
    if (selectedClient) {
      handleClearSelectedClient();
    }
  };

  const handleCpfBlur = async () => {
    const { cpf_cnpj } = getValues();

    if (cpf_cnpj.length === 11) {
      try {
        const { data: clientData } = await ServiceApi.ClientApi.get({
          cpf: cpf_cnpj,
          withCars: true,
        });

        handleSelectedClient(clientData);

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
      <Form form={form} onValid={handleValid} title="Adicionar Orçamento" icon="BudgetLoadingIcon">
        <InputForm
          label="CPF/CNPJ"
          {...register('cpf_cnpj', { onChange: handleCpfChange, onBlur: handleCpfBlur })}
        />
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

        <CarFields />

        <Textarea
          labelProps={{ className: 'col-span-full' }}
          className="h-20"
          label="Observação"
          {...register('observation')}
        />
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

export default function AddCar() {
  return (
    <GarageAddCarProvider>
      <AddCarContent />
    </GarageAddCarProvider>
  );
}
