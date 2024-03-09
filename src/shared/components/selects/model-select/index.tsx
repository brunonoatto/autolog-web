import { forwardRef } from 'react';

import { useListModelsBrand } from '@core/service/fipe';
import { TSelectDefaultProps } from '@shared/design-system/select';
import Select from '@shared/components/form/select';
import { buildSelectOptions } from '@shared/design-system/select/helpers';

type TModelSelectProps = TSelectDefaultProps & { brandId: string };

const ModelSelect = forwardRef<HTMLSelectElement, TModelSelectProps>(
  ({ brandId, ...props }, ref) => {
    const { data: listModels } = useListModelsBrand(brandId);

    const options = buildSelectOptions(listModels, 'code', 'name');

    return <Select ref={ref} options={options} disabled={!options.length} {...props} />;
  },
);

export default ModelSelect;
