import { forwardRef } from 'react';

import Select from '@shared/components/form/select';
import type { TSelectDefaultProps, TSelectOption } from '@shared/design-system/select';
import { StatusCarEnum } from '@shared/types/statusCar';
import { getStatusCarDescription } from '@shared/helpers/string';

const CarStatusSelect = forwardRef<HTMLSelectElement, TSelectDefaultProps>((props, ref) => {
  const options: TSelectOption[] = [
    { value: StatusCarEnum.WaitingBudget, title: getStatusCarDescription(StatusCarEnum.WaitingBudget) },
    { value: StatusCarEnum.WaitingBudgetApproval, title: getStatusCarDescription(StatusCarEnum.WaitingBudgetApproval) },
    { value: StatusCarEnum.ApprovedBudget, title: getStatusCarDescription(StatusCarEnum.ApprovedBudget) },
    { value: StatusCarEnum.BudgetRejected, title: getStatusCarDescription(StatusCarEnum.BudgetRejected) },
    { value: StatusCarEnum.RunningService, title: getStatusCarDescription(StatusCarEnum.RunningService) },
  ];

  return <Select options={options} ref={ref} {...props} />;
});

export default CarStatusSelect;
