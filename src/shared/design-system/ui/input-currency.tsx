import React, { useCallback, useEffect, useState } from 'react';

import {
  formatToDisplayValue,
  sanitizeChangedValue,
} from '@shared/design-system/helpers/input-currency';
import { Input } from '@shared/design-system/ui/input';

export interface TInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, TInputProps>(
  ({ error, onChange, onBlur, value: propsValue, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState('');

    const initializeDisplayValue = useCallback(() => {
      if (typeof propsValue !== 'number') {
        if (displayValue !== '') setDisplayValue('');
        return;
      }

      const decimalDisplayValue = parseFloat(displayValue.replace(',', '.'));
      const alreadyInitDisplayValue = decimalDisplayValue === propsValue;

      if (alreadyInitDisplayValue) return;

      const formattedValue = formatToDisplayValue(sanitizeChangedValue(propsValue.toString()));
      setDisplayValue(formattedValue);
    }, [displayValue, propsValue]);

    const notifyChange = useCallback(
      (
        newDisplayValue: string,
        originalEvent: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>,
      ) => {
        const decimalValue = parseFloat(newDisplayValue.replace(',', '.'));

        onChange?.({
          ...originalEvent,
          target: {
            ...originalEvent.target,
            name: props.name,
            value: isNaN(decimalValue) ? null : decimalValue,
          },
        } as any);
      },
      [onChange, props.name],
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const sanitizedValue = sanitizeChangedValue(e.target.value);
      setDisplayValue(sanitizedValue);
      notifyChange(sanitizedValue, e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (!inputValue) {
        onBlur?.(e);
        return;
      }

      const formattedValue = formatToDisplayValue(inputValue);
      if (formattedValue !== displayValue) setDisplayValue(formattedValue);
      //notifyChange(formattedValue, e);

      if (onBlur) onBlur(e);
    };

    useEffect(() => {
      initializeDisplayValue();
    }, [initializeDisplayValue]);

    return (
      <>
        <Input
          {...props}
          type="text"
          inputMode="decimal" // Abre teclado numérico com separador no mobile
          autoComplete="off"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="0,00"
          ref={ref}
        />
      </>
    );
  },
);

export { CurrencyInput };
