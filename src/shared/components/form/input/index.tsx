import { forwardRef } from 'react';

import { useFormState } from 'react-hook-form';

import Input, { TInputProps } from '@shared/design-system/input';

const InputForm = forwardRef<HTMLInputElement, TInputProps>((props, ref) => {
  const formState = useFormState({ name: props.name });

  if (!props.name) return null;

  return <Input ref={ref} error={formState.errors[props.name]?.message as string} {...props} />;
});

export default InputForm;
