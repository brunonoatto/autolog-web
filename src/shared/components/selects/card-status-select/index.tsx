import { forwardRef } from 'react';

import Select from '@shared/components/form/select';
import type { TSelectDefaultProps, TSelectOption } from '@shared/design-system/select';
import { getStatusCarDescription } from '@shared/helpers/string';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

const statusIds = Object.values(BudgetStatusEnum).filter((v) => !isNaN(v as number));

const options: TSelectOption[] = statusIds.map((s) => ({
  value: s,
  title: getStatusCarDescription(s as BudgetStatusEnum),
}));

const CarStatusSelect = forwardRef<HTMLSelectElement, TSelectDefaultProps>((props, ref) => {
  return <Select options={options} ref={ref} {...props} />;
});

export default CarStatusSelect;
