import { forwardRef } from 'react';

import { useFormState } from 'react-hook-form';

import InputNumber, { TInputNumberProps } from '@shared/design-system/inputNumber';

const InputNumberForm = forwardRef<HTMLInputElement, TInputNumberProps>((props, ref) => {
  const formState = useFormState({ name: props.name });

  if (!props.name) return null;

  return <InputNumber ref={ref} error={formState.errors[props.name]?.message as string} {...props} />;
});

export default InputNumberForm;
