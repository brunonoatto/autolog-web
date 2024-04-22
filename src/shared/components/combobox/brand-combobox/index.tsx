import { FieldValues } from 'react-hook-form';

import { useListBrands } from '@core/service/fipe';
import Combobox, { TComboboxDefaultProps } from '@shared/design-system/ui/combobox';
import { buildSelectOptions } from '@shared/design-system_old/select/helpers';

export default function BrandCombobox<T extends FieldValues>(props: TComboboxDefaultProps<T>) {
  const { data: listBrands } = useListBrands();

  const options = buildSelectOptions(listBrands, 'code', 'name');

  return <Combobox {...props} items={options} />;
}
