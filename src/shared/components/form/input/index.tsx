import { forwardRef } from 'react';

import { useFormState } from 'react-hook-form';

import Input, { TInputProps } from '@shared/design-system/input';

const InputForm = forwardRef<HTMLInputElement, TInputProps>((props, ref) => {
  const { name } = props || {};
  const formState = useFormState({ name });

  if (!name) return null;

  return <Input ref={ref} error={formState.errors[name]?.message as string} {...props} />;
});

export default InputForm;
