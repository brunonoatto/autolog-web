import { forwardRef } from 'react';

import { useFormState } from 'react-hook-form';

import type { TInputProps } from '@shared/design-system/input';
import InputNumber from '@shared/design-system/inputNumber';

const InputNumberForm = forwardRef<HTMLInputElement, TInputProps>((props, ref) => {
  const { name } = props || {};
  const formState = useFormState({ name });

  if (!name) return null;

  return <InputNumber ref={ref} error={formState.errors[name]?.message as string} {...props} />;
});

export default InputNumberForm;
