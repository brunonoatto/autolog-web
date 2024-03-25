import { SubmitHandler, useFormContext } from 'react-hook-form';

import { TNewBudgetItem } from '@core/api/budget-item/types';
import { useGetBudget } from '@core/service/budget';
import { useAddBudgetItem } from '@core/service/budget-items';
import Form from '@layout/form';
import type { TBudgetItemFormType } from '@modules/garage/budget-view';
import InputForm from '@shared/components/form/input';
import InputNumberForm from '@shared/components/form/inputNumber';

type BudgetViewFormProps = {
  os: string;
};
export default function BudgetViewForm({ os }: BudgetViewFormProps) {
  const { mutate: mutateAddBudgetItem } = useAddBudgetItem();
  const { refetch } = useGetBudget();

  const form = useFormContext<TBudgetItemFormType>();
  const { register, reset, handleSubmit } = form;

  const handleAddBudgetItem: SubmitHandler<TBudgetItemFormType> = async (formValues) => {
    const newData: TNewBudgetItem = {
      os,
      ...formValues,
    };

    mutateAddBudgetItem(newData, {
      onSuccess: () => {
        refetch();
        reset();
      },
    });
  };

  return (
    <Form
      form={form}
      onSubmit={handleSubmit(handleAddBudgetItem)}
      title="Aicionar Item no Orçamento"
      confirmButtonText="Adicionar"
      iconButton="AddItemIcon"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <InputForm
          label="Descrição"
          labelProps={{ className: 'col-span-full' }}
          {...register('description')}
        />
        <InputNumberForm label="Quantidade" {...register('qtd')} />
        <InputNumberForm label="Preço Unitário" {...register('price')} />
      </div>
    </Form>
  );
}
