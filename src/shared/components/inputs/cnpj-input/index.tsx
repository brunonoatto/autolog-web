import React from 'react';

import { cn } from '@shared/design-system/helpers/utils';
import MaskInput, { type TMaskInput } from '@shared/design-system/ui/input-mask';
import MasksEnum from '@shared/helpers/string/masks';

type TCnpjInputProps = Omit<TMaskInput, 'mask' | 'maskSecond' | 'maskSecondCondition'>;

const CnpjInput = React.forwardRef<HTMLInputElement, TCnpjInputProps>(
  ({ className, ...otherProps }, ref) => {
    return (
      <MaskInput
        {...otherProps}
        className={cn('w-64', className)}
        ref={ref}
        mask={MasksEnum.cnpj}
      />
    );
  },
);

export default CnpjInput;
