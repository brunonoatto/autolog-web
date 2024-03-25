import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useGetBudget } from '@core/service/budget';
import { yup, yupValidators } from '@shared/form-validations';
import BudgetTitle from '@modules/garage/budget-view/title';
import BudgetActions from '@modules/garage/budget-view/actions';
import BudgetViewForm from '@modules/garage/budget-view/form';
import BudgetViewTable from '@modules/garage/budget-view/table';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

const schema = yup
  .object({
    description: yupValidators.StringValidator().required(),
    qtd: yupValidators.NumberValidator().required(),
    price: yupValidators.NumberValidator().required(),
  })
  .required();

export type TBudgetItemFormType = yup.InferType<typeof schema>;

export default function GarageBudgetView() {
  const { data: budget } = useGetBudget();

  const { os, status, car, items } = budget || {};

  const form = useForm({
    defaultValues: { qtd: 1, price: 0 },
    resolver: yupResolver(schema),
  });

  const allowEditBudget = status === BudgetStatusEnum.MakingBudget;
  const showActions = status && os && !!items?.length;

  return (
    <div className="space-y-2">
      <BudgetTitle car={car} status={status} />

      <FormProvider {...form}>
        {allowEditBudget && <BudgetViewForm os={os || ''} />}

        <BudgetViewTable allowActions={allowEditBudget} />
      </FormProvider>

      {showActions && <BudgetActions status={status} os={os} />}
    </div>
  );
}
