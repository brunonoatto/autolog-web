import { forwardRef } from 'react';

import { useFormState } from 'react-hook-form';

import Select, { type TSelectProps } from '@shared/design-system/select';

const SelectForm = forwardRef<HTMLSelectElement, TSelectProps>((props, ref) => {
  const formState = useFormState({ name: props.name });

  if (!props.name) return null;

  return <Select ref={ref} error={formState.errors[props.name]?.message as string} {...props} />;
});

export default SelectForm;
