import { forwardRef } from 'react';
import { useFormState } from 'react-hook-form';

import type { TInputProps } from '@shared/design-system_old/input';
import InputDate from '@shared/design-system_old/inputDate';

const InputDateForm = forwardRef<HTMLInputElement, TInputProps>((props, ref) => {
  const { name } = props || {};
  const formState = useFormState({ name });

  if (!name) return null;

  return <InputDate ref={ref} error={formState.errors[name]?.message as string} {...props} />;
});

export default InputDateForm;
