import { FieldValues } from 'react-hook-form';

import { useListModelsBrand } from '@core/service/fipe';
import Combobox, { TComboboxDefaultProps } from '@shared/design-system/ui/combobox';
import { buildSelectOptions } from '@shared/design-system_old/select/helpers';

type TModelComboboxProps<T extends FieldValues> = TComboboxDefaultProps<T> & { brandId: string };

export default function ModelCombobox<T extends FieldValues>(props: TModelComboboxProps<T>) {
  const { brandId, ...otherProps } = props;

  const { data: listModels } = useListModelsBrand(brandId);

  const options = buildSelectOptions(listModels, 'code', 'name');

  return <Combobox {...otherProps} disabled={!options.length} items={options} />;
}
