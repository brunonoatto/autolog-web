import { forwardRef } from 'react';

import { useFormState } from 'react-hook-form';

import InputDate, { TInputDateProps } from '@shared/design-system/inputDate';

const InputDateForm = forwardRef<HTMLInputElement, TInputDateProps>((props, ref) => {
  const formState = useFormState({ name: props.name });

  if (!props.name) return null;

  return <InputDate ref={ref} error={formState.errors[props.name]?.message as string} {...props} />;
});

export default InputDateForm;
