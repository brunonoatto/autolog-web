import { zodResolver } from '@hookform/resolvers/zod';
import { ListPlus } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import { TNewBudgetItem } from '@core/api/budget-item/types';
import { useAddBudgetItem } from '@core/service/budget-items';
import useBudgetViewContext from '@core/store/context/BudgetViewContext/hook';
import Form from '@shared/components/form';
import FormField from '@shared/components/form/form-field';
import { Input } from '@shared/design-system/ui/input';
import { CurrencyInput } from '@shared/design-system/ui/input-currency';
import { zodValidators } from '@shared/form-validations';
import { MIN_INVALID_MSG } from '@shared/form-validations/consts';

const schema = z
  .object({
    description: zodValidators.String().toUpperCase(),
    qtd: zodValidators.Number().min(1, MIN_INVALID_MSG(0)),
    price: zodValidators.Number().min(0.01, MIN_INVALID_MSG(0)),
  })
  .strict();

export type TBudgetItemFormType = z.infer<typeof schema>;

export function AddBugdetItemForm() {
  const { mutate: mutateAddBudgetItem } = useAddBudgetItem();

  const { budget } = useBudgetViewContext();
  const { id = '' } = budget || {};

  const form = useForm<TBudgetItemFormType>({
    defaultValues: { qtd: 1 },
    resolver: zodResolver(schema),
  });
  const { control, reset, setFocus } = form;

  const handleValid: SubmitHandler<TBudgetItemFormType> = (formValues) => {
    const newBudgetItem: TNewBudgetItem = {
      budgetId: id,
      ...formValues,
    };

    // Se este setFocus ficar depois do reset não funciona
    setFocus('description');
    reset();

    mutateAddBudgetItem(newBudgetItem);
  };

  return (
    <Form
      form={form}
      border
      title="Adicionar Item no Orçamento"
      icon={ListPlus}
      confirmButtonText="Adicionar"
      confirmButtonProps={{ icon: ListPlus }}
      onValid={handleValid}
    >
      <FormField className="col-span-full" control={control} name="description" label="Descrição">
        <Input className="uppercase" />
      </FormField>

      <FormField control={control} name="qtd" label="Quantidade">
        <Input type="number" />
      </FormField>

      <FormField control={control} name="price" label="Preço Unitário (R$)">
        <CurrencyInput />
      </FormField>
    </Form>
  );
}
