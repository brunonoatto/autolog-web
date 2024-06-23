import React from 'react';

import { cn } from '@shared/design-system/helpers/utils';
import MaskInput, { type TMaskInput } from '@shared/design-system/ui/input-mask';
import MasksEnum from '@shared/helpers/string/masks';

type TCpfCnpjInputProps = Omit<TMaskInput, 'mask' | 'maskSecond' | 'maskSecondCondition'>;

const CpfCnpjInput = React.forwardRef<HTMLInputElement, TCpfCnpjInputProps>(
  ({ className, ...otherProps }, ref) => {
    const handleCpjnMaskCondition = (e: React.KeyboardEvent<HTMLInputElement>, value: string) => {
      const keyIsNumber = !!Number(e.key);

      return value.length > 12 || (keyIsNumber && value.length >= 11);
    };

    return (
      <MaskInput
        {...otherProps}
        className={cn('w-64', className)}
        ref={ref}
        mask={MasksEnum.cpf}
        maskSecond={MasksEnum.cnpj}
        maskSecondCondition={handleCpjnMaskCondition}
      />
    );
  },
);

export default CpfCnpjInput;
