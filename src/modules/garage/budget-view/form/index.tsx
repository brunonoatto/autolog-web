import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import { TNewBudgetItem } from '@core/api/budget-item/types';
import { useAddBudgetItem } from '@core/service/budget-items';
import useBudgetView from '@core/store/context/hooks/useBudgetViewContext';
import Form from '@shared/components/form';
import FormField from '@shared/components/form/form-field';
import { Input } from '@shared/design-system/ui/input';
import { useToast } from '@shared/design-system/ui/use-toast';
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

export default function BudgetViewForm() {
  const { toast } = useToast();
  const { mutate: mutateAddBudgetItem } = useAddBudgetItem();

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

    // Se este setFocus ficar depois do reset não funciona
    setFocus('description');
    reset();

    mutateAddBudgetItem(newData, {
      onError: () => {
        toast({
          title: `Não foi possível adicionar o item '${formValues.description}'.`,
          variant: 'destructive',
        });
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
      border={true}
    >
      <FormField className="col-span-full" control={control} name="description" label="Descrição">
        <Input className="uppercase" />
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
