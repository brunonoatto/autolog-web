import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { BudgetViewProvider } from '@core/store/context/BudgetViewContext';
import useBudgetView from '@core/store/context/hooks/useBudgetViewContext';
import BudgetViewActions from '@modules/garage/budget-view/actions';
import BudgetViewForm from '@modules/garage/budget-view/form';
import BudgetViewTable from '@modules/garage/budget-view/table';
import BudgetViewTitle from '@modules/garage/budget-view/title';
import { yup, yupValidators } from '@shared/form-validations';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

const schema = yup
  .object({
    description: yupValidators.StringValidator().required(),
    qtd: yupValidators.NumberValidator().required(),
    price: yupValidators.NumberValidator().required(),
  })
  .required();

export type TBudgetItemFormType = yup.InferType<typeof schema>;

function GarageBudgetViewContent() {
  const { budget } = useBudgetView();
  const { status } = budget || {};

  const allowEditBudget = status === BudgetStatusEnum.MakingBudget;

  const form = useForm({
    defaultValues: { qtd: 1, price: 0 },
    resolver: yupResolver(schema),
  });

  if (!budget) {
    return <>Loading...</>;
  }

  return (
    <div className="space-y-2">
      <BudgetViewTitle />

      <FormProvider {...form}>
        {allowEditBudget && <BudgetViewForm />}

        <BudgetViewTable allowActions={allowEditBudget} />
      </FormProvider>

      <BudgetViewActions />
    </div>
  );
}

export default function GarageBudgetView() {
  return (
    <BudgetViewProvider>
      <GarageBudgetViewContent />
    </BudgetViewProvider>
  );
}
