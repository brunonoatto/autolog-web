import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { BudgetViewProvider } from '@core/store/context/BudgetViewContext';
import useBudgetView from '@core/store/context/hooks/useBudgetViewContext';
import BudgetViewActions from '@modules/garage/budget-view/actions';
import BudgetViewForm from '@modules/garage/budget-view/form';
import BudgetCard from '@shared/components/budget-card';
import BudgetTable from '@shared/components/budget-table';
import Container from '@shared/components/container';
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
  const { status, car } = budget || {};

  const allowEditBudget = status === BudgetStatusEnum.MakingBudget;

  const form = useForm({
    defaultValues: { qtd: 1, price: 0 },
    resolver: yupResolver(schema),
  });

  if (!budget) {
    return <>Loading...</>;
  }

  return (
    <Container title="Orçamento">
      <Container.Content>
        <BudgetCard status={status} car={car} />

        <FormProvider {...form}>
          {allowEditBudget && <BudgetViewForm />}

          <BudgetTable allowActions={allowEditBudget} />
        </FormProvider>

        <BudgetViewActions />
      </Container.Content>
    </Container>
  );
}

export default function GarageBudgetView() {
  return (
    <BudgetViewProvider>
      <GarageBudgetViewContent />
    </BudgetViewProvider>
  );
}
