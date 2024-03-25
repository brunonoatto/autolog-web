import { forwardRef } from 'react';

import Select from '@shared/components/form/select';
import type { TSelectDefaultProps, TSelectOption } from '@shared/design-system/select';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';
import { getStatusCarDescription } from '@shared/helpers/string';

const CarStatusSelect = forwardRef<HTMLSelectElement, TSelectDefaultProps>((props, ref) => {
  const options: TSelectOption[] = [
    {
      value: BudgetStatusEnum.MakingBudget,
      title: getStatusCarDescription(BudgetStatusEnum.MakingBudget),
    },
    {
      value: BudgetStatusEnum.WaitingBudgetApproval,
      title: getStatusCarDescription(BudgetStatusEnum.WaitingBudgetApproval),
    },
    {
      value: BudgetStatusEnum.ApprovedBudget,
      title: getStatusCarDescription(BudgetStatusEnum.ApprovedBudget),
    },
    {
      value: BudgetStatusEnum.BudgetRejected,
      title: getStatusCarDescription(BudgetStatusEnum.BudgetRejected),
    },
    {
      value: BudgetStatusEnum.RunningService,
      title: getStatusCarDescription(BudgetStatusEnum.RunningService),
    },
  ];

  return <Select options={options} ref={ref} {...props} />;
});

export default CarStatusSelect;
