import { SubmitHandler, useFormContext } from 'react-hook-form';

import type { TNewBudgetItem } from '@core/api/budget-item/types';
import { useGetBudget } from '@core/service/budget';
import { useAddBudgetItem } from '@core/service/budget-items';
import useBudgetView from '@core/store/context/hooks/useBudgetViewContext';
import Form from '@layout/form';
import type { TBudgetItemFormType } from '@modules/garage/budget-view';
import InputForm from '@shared/components/form/input';
import InputNumberForm from '@shared/components/form/inputNumber';

export default function BudgetViewForm() {
  const { mutate: mutateAddBudgetItem } = useAddBudgetItem();
  const { refetch } = useGetBudget();

  const { budget } = useBudgetView();
  const { os = '' } = budget || {};

  const form = useFormContext<TBudgetItemFormType>();
  const { register, reset, handleSubmit, setFocus } = form;

  const handleAddBudgetItem: SubmitHandler<TBudgetItemFormType> = async (formValues) => {
    const newData: TNewBudgetItem = {
      os,
      ...formValues,
    };

    mutateAddBudgetItem(newData, {
      onSuccess: () => {
        refetch();
        reset({
          description: '',
          qtd: 0,
          price: 0,
        });
        // TODO: Não funciona
        setFocus('description');
      },
    });
  };

  return (
    <Form
      form={form}
      onSubmit={handleSubmit(handleAddBudgetItem)}
      title="Adicionar Item no Orçamento"
      confirmButtonText="Adicionar"
      iconButton="AddItemIcon"
    >
      <InputForm
        label="Descrição"
        labelProps={{ className: 'col-span-full' }}
        {...register('description')}
      />
      <InputNumberForm label="Quantidade" {...register('qtd')} />
      <InputNumberForm label="Preço Unitário" {...register('price')} />
    </Form>
  );
}
