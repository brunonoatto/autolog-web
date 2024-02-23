import { forwardRef } from 'react';

import { useListBrands } from '@core/service/fipe';
import Select from '@shared/components/form/select';
import type { TSelectDefaultProps } from '@shared/design-system/select';
import { buildSelectOptions } from '@shared/design-system/select/helpers';

const BrandSelect = forwardRef<HTMLSelectElement, TSelectDefaultProps>((props, ref) => {
  const { data: listBrands } = useListBrands();

  const options = buildSelectOptions(listBrands, 'code', 'name');

  return <Select options={options} ref={ref} {...props} />;
});

export default BrandSelect;
