import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import { TNewBudgetItem } from '@core/api/budget-item/types';
import { useGetBudget } from '@core/service/budget';
import { useAddBudgetItem } from '@core/service/budget-items';
import useBudgetView from '@core/store/context/hooks/useBudgetViewContext';
import Form from '@shared/components/form';
import FormField from '@shared/components/form/form-field';
import { Input } from '@shared/design-system/ui/input';
import { zodValidators } from '@shared/form-validations';
import { MIN_INVALID_MSG } from '@shared/form-validations/consts';

const schema = z
  .object({
    description: zodValidators.String(),
    qtd: zodValidators.Number().min(1, MIN_INVALID_MSG(0)),
    price: zodValidators.Number().min(0.01, MIN_INVALID_MSG(0)),
  })
  .strict();

export type TBudgetItemFormType = z.infer<typeof schema>;

export default function BudgetViewForm() {
  const { mutate: mutateAddBudgetItem } = useAddBudgetItem();
  const { refetch } = useGetBudget();

  const { budget } = useBudgetView();
  const { os = '' } = budget || {};

  const form = useForm<TBudgetItemFormType>({
    defaultValues: { qtd: 1 },
    resolver: zodResolver(schema),
  });
  const { control, reset, setFocus } = form;

  const handleValid: SubmitHandler<TBudgetItemFormType> = (formValues) => {
    const newData: TNewBudgetItem = {
      os,
      ...formValues,
    };

    mutateAddBudgetItem(newData, {
      onSuccess: () => {
        refetch();
        // Se este setFocus ficar depois do reset não funciona
        setFocus('description');
        reset();
      },
    });
  };

  return (
    <Form
      form={form}
      onValid={handleValid}
      title="Adicionar Item no Orçamento"
      iconButton="list-plus"
      confirmButtonText="Adicionar"
    >
      <FormField className="col-span-full" control={control} name="description" label="Descrição">
        <Input />
      </FormField>

      <FormField control={control} name="qtd" label="Quantidade">
        <Input type="number" />
      </FormField>

      <FormField control={control} name="price" label="Preço Unitário">
        <Input type="number" />
      </FormField>
    </Form>
  );
}
