import { zodResolver } from '@hookform/resolvers/zod';
import { ListPlus } from 'lucide-react';
import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import { TBudgetItem, TFormBudgetItem } from '@core/api/budget-item/types';
import useBudgetViewContext from '@core/store/context/BudgetViewContext/hook';
import Form from '@shared/components/form';
import FormField from '@shared/components/form/form-field';
import { Input } from '@shared/design-system/ui/input';
import { CurrencyInput } from '@shared/design-system/ui/input-currency';
import { zodValidators } from '@shared/form-validations';
import { MIN_INVALID_MSG } from '@shared/form-validations/consts';

const schema = z
  .object({
    id: zodValidators.String().optional(),
    description: zodValidators.String().toUpperCase(),
    qtd: zodValidators.Number().min(1, MIN_INVALID_MSG(0)),
    price: zodValidators.Number().min(0.01, MIN_INVALID_MSG(0)),
  })
  .strict();

export type TBudgetItemFormType = z.infer<typeof schema>;

type TBugdetItemFormProps = {
  id?: string;
  showFooter?: boolean;
  item?: TBudgetItem;
  onSubmit: (formValue: TFormBudgetItem) => void;
};

export function BugdetItemForm({ id, item, onSubmit, showFooter }: TBugdetItemFormProps) {
  const { budget } = useBudgetViewContext();

  const defaultValues = useMemo(() => (item ? schema.strip().parse(item) : { qtd: 1 }), [item]);

  const form = useForm<TBudgetItemFormType>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { control, reset, setFocus } = form;

  const handleValid: SubmitHandler<TBudgetItemFormType> = (formValues) => {
    const newOrEditedBudgetItem: TFormBudgetItem = {
      budgetId: budget?.id || '',
      ...defaultValues,
      ...formValues,
    };

    // Se este setFocus ficar depois do reset não funciona
    setFocus('description');
    reset();

    onSubmit(newOrEditedBudgetItem);
  };

  return (
    <Form
      id={id}
      form={form}
      border
      title="Adicionar Item no Orçamento"
      icon={ListPlus}
      confirmButtonText="Adicionar"
      confirmButtonProps={{ icon: ListPlus }}
      onValid={handleValid}
      showFooter={showFooter}
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
