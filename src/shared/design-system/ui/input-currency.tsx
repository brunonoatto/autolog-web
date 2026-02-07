import React, { useCallback, useEffect, useState } from 'react';

import { Input } from '@shared/design-system/ui/input';

export interface TInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const sanitizeChangedValue = (value: string) => {
  let result = value;
  result = result.replace(/\./g, ','); // 1. Troca ponto por vírgula na hora
  result = result.replace(/[^\d,]/g, ''); // 2. Remove caracteres inválidos (aceita apenas números e uma vírgula)
  const parts = result.split(',');
  if (parts?.length > 2) result = parts[0] + ',' + parts.slice(1).join(''); // 3. Impede mais de uma vírgula
  if (parts[1]?.length > 2) result = `${parts[0]},${parts[1].slice(0, 2)}`; // 4. Limita a 2 casas decimais enquanto digita (opcional, mas recomendado)

  return result;
};

const formatToDisplayValue = (value: string) => {
  let result = value;
  if (result.startsWith(',')) result = '0' + result; // Se o usuário digitou apenas a vírgula (ex: ",5"), adicionamos o zero à esquerda

  // Se não tem vírgula, adiciona ",00"
  if (!result.includes(',')) {
    result += ',00';
  } else {
    // Se tem vírgula, garante duas casas decimais
    const [integer, decimal] = result.split(',');
    result = `${integer},${decimal.padEnd(2, '0')}`;
  }

  return result;
};

const CurrencyInput = React.forwardRef<HTMLInputElement, TInputProps>(
  ({ error, onChange, onBlur, value: propsValue, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState('');

    // Sincroniza quando o formulário é resetado ou valor alterado externamente
    useEffect(() => {
      if (typeof propsValue !== 'number') {
        if (displayValue !== '') setDisplayValue('');
        return;
      }
      const decimalDisplayValue = parseFloat(displayValue.replace(',', '.'));
      const alreadyInitDisplayValue = decimalDisplayValue === propsValue;

      if (alreadyInitDisplayValue) return;

      const formattedValue = formatToDisplayValue(sanitizeChangedValue(propsValue.toString()));
      setDisplayValue(formattedValue);
    }, [propsValue, displayValue]);

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
