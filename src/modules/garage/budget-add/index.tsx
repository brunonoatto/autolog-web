import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import { TNewBudgetParams } from '@core/api/budget/types';
import { useAddBudget } from '@core/service/budget';
import { useListBrands, useListModelsBrand } from '@core/service/fipe';
import { BudgetAddProvider } from '@core/store/context/BudgetAddContext';
import useBudgetAddContext from '@core/store/context/BudgetAddContext/hook';
import { TBudgetAddFormType } from '@core/store/context/types/budget-add';
import { useLoadingStore } from '@core/store/hooks';
import CarFields from '@modules/garage/budget-add/car-fields';
import { GARAGE_BUDGET_ADD_FORM_TEST_ID } from '@modules/garage/budget-add/const';
import Form from '@shared/components/form';
import FormField from '@shared/components/form/form-field';
import CpfCnpjInput from '@shared/components/inputs/cpf-cnpj-input';
import LoadingIcon from '@shared/components/loading-icon';
import { CardTitle } from '@shared/design-system/ui/card';
import { Input } from '@shared/design-system/ui/input';
import MaskInput from '@shared/design-system/ui/input-mask';
import Modal from '@shared/design-system/ui/modal';
import { Textarea } from '@shared/design-system/ui/textarea';
import MasksEnum from '@shared/helpers/string/masks';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

function BudgetAddContent() {
  const [generateOS, setGenerateOS] = useState('');
  const navigate = useNavigateCustom();
  const { mutate } = useAddBudget();
  const loading = useLoadingStore((state) => state.loading);

  const isLoadingClient = useBudgetAddContext((prop) => prop.isLoadingClient);
  const selectedClient = useBudgetAddContext((prop) => prop.selectedClient);
  const selectedCar = useBudgetAddContext((prop) => prop.selectedCar);
  const handleClearSelectedClient = useBudgetAddContext((prop) => prop.handleClearSelectedClient);
  const handleLoadClient = useBudgetAddContext((prop) => prop.handleLoadClient);

  const handleLoadClientDebounce = useDebouncedCallback(handleLoadClient, 300);

  const form = useFormContext<TBudgetAddFormType>();
  const { control, watch } = form;

  const brandId = watch('brand');

  const { data: listBrands } = useListBrands();
  const { data: listModels } = useListModelsBrand(brandId);

  const handleSuccessConfirm = () => {
    navigate(['/garage/orcamento', generateOS]);
  };

  const handleSuccessCancel = () => {
    navigate('/garage');
  };

  const handleValid: SubmitHandler<TBudgetAddFormType> = async (formValues) => {
    loading(true);

    const clientId = selectedClient?.id;
    const carId = selectedCar?.id;

    // TODO: transformar essa lógica em hook
    const brand = listBrands?.find((b) => b.code === formValues.brand)?.name;
    const model = listModels?.find((b) => b.code === formValues.model)?.name;

    const newBudget: TNewBudgetParams = {
      clientId,
      newClient: clientId
        ? undefined
        : {
            cpfCnpj: formValues.cpfCnpj,
            name: formValues.name,
            phone: formValues.phone,
          },
      carId,
      car: carId
        ? undefined
        : {
            license: formValues.license,
            brand: brand!,
            model: model!,
            year: formValues.year,
          },
      observation: formValues.observation,
    };

    mutate(newBudget, {
      onSuccess: (budget) => setGenerateOS(budget.os),
      onSettled: () => loading(false),
    });
  };

  const handleCpfChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (selectedClient) {
      handleClearSelectedClient();
    }

    handleLoadClientDebounce(event.target.value);
  };

  return (
    <>
      <Form
        data-testid={GARAGE_BUDGET_ADD_FORM_TEST_ID}
        form={form}
        onValid={handleValid}
        title="Adicionar Orçamento"
        icon="circle-dollar-sign"
      >
        <CardTitle className="col-span-full" icon="user" size="lg">
          Dados do Cliente
        </CardTitle>

        <div className="flex items-start gap-2">
          <FormField className="flex-1" control={control} name="cpfCnpj" label="CPF/CNPJ" isMask>
            <CpfCnpjInput onChange={handleCpfChange} placeholder="Informe o CPF/CNPJ do Cliente" />
          </FormField>

          {/* TODO: pensar numa forma de mandar o isLoading para o FielField */}
          {isLoadingClient && <LoadingIcon className="mt-10" />}
        </div>

        <FormField
          className="lg:row-start-3 md:col-span-2"
          control={control}
          name="name"
          label="Nome Cliente"
        >
          <Input disabled={!!selectedClient} placeholder="Informe o nome do Cliente" />
        </FormField>

        <FormField className="lg:row-start-3" control={control} name="phone" label="Telefone">
          <MaskInput
            mask={MasksEnum.phone}
            disabled={!!selectedClient}
            placeholder="Informe o telefone do Cliente"
          />
        </FormField>

        <CarFields />

        <FormField
          className="col-span-full"
          control={control}
          name="observation"
          label="Observações"
        >
          <Textarea rows={5} placeholder="Informe as observações do Orçamento" />
        </FormField>
      </Form>

      <Modal
        open={!!generateOS}
        title="Orçamento cadastrado com sucesso!"
        confirmText="Editar orçamento"
        onConfirmClick={handleSuccessConfirm}
        cancelText="Ir para Dashboard"
        onCancelClick={handleSuccessCancel}
      />
    </>
  );
}

export default function BudgetAdd() {
  return (
    <BudgetAddProvider>
      <BudgetAddContent />
    </BudgetAddProvider>
  );
}
