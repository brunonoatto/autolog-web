import { useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import { TNewBudgetParams } from '@core/api/budget/types';
import { useAddBudget } from '@core/service/budget';
import { useListBrands, useListModelsBrand } from '@core/service/fipe';
import useBudgetAddContext from '@core/store/context/BudgetAddContext/hook';
import { BudgetAddProvider } from '@core/store/context/BudgetAddContext/provider';
import { TBudgetAddFormType } from '@core/store/context/types/budget-add';
import { useLoadingStore } from '@core/store/hooks';
import CarFields from '@modules/garage/budget-add/car-fields';
import { ClientData } from '@modules/garage/budget-add/client-fields';
import { GARAGE_BUDGET_ADD_FORM_TEST_ID } from '@modules/garage/budget-add/const';
import Form from '@shared/components/form';
import FormField from '@shared/components/form/form-field';
import Modal from '@shared/design-system/ui/modal';
import { Textarea } from '@shared/design-system/ui/textarea';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

function BudgetAddContent() {
  const [generateOS, setGenerateOS] = useState('');
  const navigate = useNavigateCustom();
  const { mutate } = useAddBudget();
  const allowSelectCar = useBudgetAddContext((prop) => prop.allowSelectCar);
  const loading = useLoadingStore((state) => state.loading);

  const form = useFormContext<TBudgetAddFormType>();
  const { control, watch } = form;

  const brandId = watch('car.brand');

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

    const clientId = formValues.client.id;
    const carId = formValues.car.id;

    const brand = listBrands?.find((b) => b.code === formValues.car.brand)?.name || '';
    const model = listModels?.find((b) => b.code === formValues.car.model)?.name || '';

    const newBudget: TNewBudgetParams = {
      clientId,
      newClient: clientId
        ? undefined
        : {
            cpfCnpj: formValues.client.cpfCnpj,
            name: formValues.client.name,
            phone: formValues.client.phone,
          },
      carId,
      car: carId
        ? undefined
        : {
            license: formValues.car.license,
            brand,
            model,
            year: formValues.car.year,
          },
      observation: formValues.observation,
    };

    mutate(newBudget, {
      onSuccess: (budget) => setGenerateOS(budget.os),
      onSettled: () => loading(false),
    });
  };

  return (
    <>
      <Form
        data-testid={GARAGE_BUDGET_ADD_FORM_TEST_ID}
        form={form}
        onValid={handleValid}
        title="Adicionar Orçamento"
        icon="circle-dollar-sign"
        confirmButtonText="Cadastrar Orçamento"
        showFooter={allowSelectCar}
      >
        <ClientData />

        {allowSelectCar && (
          <>
            <CarFields />

            <FormField
              className="col-span-full"
              control={control}
              name="observation"
              label="Observações"
            >
              <Textarea rows={5} placeholder="Informe as observações do Orçamento" />
            </FormField>
          </>
        )}
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
