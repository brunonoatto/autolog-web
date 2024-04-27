import React from 'react';

import { cn } from '@shared/design-system/helpers/utils';
import { useFormFieldValue } from '@shared/design-system/ui/form';
import { Input, TInputProps } from '@shared/design-system/ui/input';

type TLicenseInputFormFieldProps = Omit<TInputProps, 'maxLength'>;

const LicenseInput = React.forwardRef<HTMLInputElement, TLicenseInputFormFieldProps>(
  ({ className, ...otherProps }, ref) => {
    const currentValue = useFormFieldValue();

    return (
      <Input
        className={cn(`${!!currentValue && 'text-xl font-bold uppercase'} w-48`, className)}
        ref={ref}
        maxLength={10}
        placeholder="Informe a placa do veículo"
        {...otherProps}
      />
    );
  },
);

export default LicenseInput;
