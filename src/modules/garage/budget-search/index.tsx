import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

import Form from '@layout/form';
import ListBudgets from '@modules/garage/budget-search/list';
import InputForm from '@shared/components/form/input';
import { yup, yupValidators } from '@shared/form-validations';

const schema = yup
  .object({
    license: yupValidators.StringValidator(),
  })
  .required();

export type TSearchBuggetFormType = yup.InferType<typeof schema>;

export default function BudgetSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm({
    defaultValues: {
      license: searchParams.get('license') || undefined,
    },
    resolver: yupResolver(schema),
  });
  const { register } = form;

  const handleValid: SubmitHandler<TSearchBuggetFormType> = (data) => {
    const params: URLSearchParamsInit = {};

    if (data.license) params.license = data.license;

    setSearchParams(params);
  };

  return (
    <>
      <Form form={form} onSubmit={handleValid} title="Adicionar veículo">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputForm
            label="Placa"
            labelProps={{ className: 'col-span-full' }}
            className="w-36 h-8 text-xl font-bold uppercase"
            maxLength={10}
            {...register('license')}
          />
        </div>
      </Form>

      <ListBudgets />
    </>
  );
}
