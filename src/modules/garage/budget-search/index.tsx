import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import z from 'zod';

import ListBudgets from '@modules/garage/budget-search/list';
import Form from '@shared/components/form';
import FormField from '@shared/components/form/form-field';
import { Input } from '@shared/design-system/ui/input';
import { zodValidators } from '@shared/form-validations';

const schema = z
  .object({
    license: zodValidators.StringOptional(),
  })
  .strict();

export type TSearchBuggetFormType = z.infer<typeof schema>;

export default function BudgetSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm<TSearchBuggetFormType>({
    defaultValues: {
      license: searchParams.get('license') || undefined,
    },
    resolver: zodResolver(schema),
  });
  const { control } = form;

  const handleValid: SubmitHandler<TSearchBuggetFormType> = (data) => {
    const params: URLSearchParamsInit = {};

    if (data.license) params.license = data.license;

    setSearchParams(params);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <Form form={form} onValid={handleValid} title="Buscar orçamento" icon="search">
        <FormField className="col-span-full" control={control} name="license" label="Placa">
          <Input className="w-36 h-8 text-xl font-bold uppercase" maxLength={10} />
        </FormField>
      </Form>

      <ListBudgets />
    </div>
  );
}
