import { forwardRef } from 'react';

import { useFormState } from 'react-hook-form';

import type { TInputProps } from '@shared/design-system/input';
import InputDate from '@shared/design-system/inputDate';

const InputDateForm = forwardRef<HTMLInputElement, TInputProps>((props, ref) => {
  const { name } = props?.inputProps || {};
  const formState = useFormState({ name });

  if (!name) return null;

  return <InputDate ref={ref} error={formState.errors[name]?.message as string} {...props} />;
});

export default InputDateForm;
