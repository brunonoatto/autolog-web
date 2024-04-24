import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import { useAddBudget } from '@core/service/budget';
import { useListBrands, useListModelsBrand } from '@core/service/fipe';
import { BudgetAddProvider, type TBudgetAddFormType } from '@core/store/context/BudgetAddContext';
import useBudgetAddContext from '@core/store/context/hooks/useBudgetAdd';
import { useLoadingStore } from '@core/store/hooks';
import CarFields from '@modules/garage/budget-add/car-fields';
import Form from '@shared/components/form';
import FormField from '@shared/components/form/form-field';
import LoadingIcon from '@shared/components/loading-icon';
import { CardTitle } from '@shared/design-system/ui/card';
import { Input } from '@shared/design-system/ui/input';
import Modal from '@shared/design-system/ui/modal';
import { Textarea } from '@shared/design-system/ui/textarea';
import useNavigateApp from '@shared/hooks/useNavigateApp';

function BudgetAddContent() {
  const [generateOS, setGenerateOS] = useState('');
  const navigate = useNavigateApp();
  const { mutate } = useAddBudget();
  const loading = useLoadingStore((state) => state.loading);

  const isLoadingClient = useBudgetAddContext((prop) => prop.isLoadingClient);
  const selectedClient = useBudgetAddContext((prop) => prop.selectedClient);
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

  const handleCpfChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (selectedClient) {
      handleClearSelectedClient();
    }

    handleLoadClientDebounce(event.target.value);
  };

  return (
    <>
      <Form form={form} onValid={handleValid} title="Adicionar Orçamento" icon="circle-dollar-sign">
        <CardTitle className="col-span-full" icon="user" size="lg">
          Dados do Cliente
        </CardTitle>

        <div className="flex items-start gap-2">
          <FormField className="flex-1" control={control} name="cpf_cnpj" label="CPF/CNPJ">
            <Input
              onChange={handleCpfChange}
              maxLength={14}
              placeholder="Informe o CPF/CNPJ do Cliente"
            />
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
          <Input disabled={!!selectedClient} placeholder="Informe o telefone do Cliente" />
        </FormField>

        <CarFields />

        <FormField
          className="col-span-full"
          control={control}
          name="observation"
          label="Observação"
        >
          <Textarea rows={5} placeholder="Informe as observações do Orçamento" />
        </FormField>
      </Form>

      <Modal
        open={!!generateOS}
        title="Veículo cadastrado com sucesso!"
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
