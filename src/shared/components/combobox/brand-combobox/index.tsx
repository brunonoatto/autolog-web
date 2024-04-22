import { FieldValues } from 'react-hook-form';

import { useListBrands } from '@core/service/fipe';
import { buildSelectOptions } from '@shared/design-system/helpers/select';
import Combobox, { TComboboxDefaultProps } from '@shared/design-system/ui/combobox';

export default function BrandCombobox<T extends FieldValues>(props: TComboboxDefaultProps<T>) {
  const { data: listBrands } = useListBrands();

  const options = buildSelectOptions(listBrands, 'code', 'name');

  return <Combobox {...props} items={options} />;
}
