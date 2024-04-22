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
import CarFields from '@modules/garage/add-car/car-fields';
import Form from '@shared/components/form';
import FormField from '@shared/components/form/form-field';
import { Input } from '@shared/design-system/ui/input';
import { Textarea } from '@shared/design-system/ui/textarea';
import Modal from '@shared/design-system_old/modal';

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
  const { control, getValues, watch, setValue } = form;

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

  const loadClientCars = async () => {
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

  const handleCpfChange = async () => {
    if (selectedClient) {
      handleClearSelectedClient();
    }

    loadClientCars();
  };

  return (
    <>
      <Form form={form} onValid={handleValid} title="Adicionar Orçamento" icon="circle-dollar-sign">
        <FormField control={control} name="cpf_cnpj" label="CPF/CNPJ">
          <Input onChange={handleCpfChange} onBlur={loadClientCars} />
        </FormField>

        <FormField
          className="lg:row-start-2 md:col-span-2"
          control={control}
          name="name"
          label="Nome Cliente"
        >
          <Input disabled={!!selectedClient} />
        </FormField>

        <FormField className="lg:row-start-2" control={control} name="phone" label="Telefone">
          <Input disabled={!!selectedClient} />
        </FormField>

        <CarFields />

        <FormField
          className="col-span-full"
          control={control}
          name="observation"
          label="Observação"
        >
          <Textarea rows={5} />
        </FormField>
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
