import { forwardRef } from 'react';

import { useFormState } from 'react-hook-form';

import Textarea, { TTextareaProps } from '@shared/design-system/textarea';

const TextareaForm = forwardRef<HTMLTextAreaElement, TTextareaProps>((props, ref) => {
  const formState = useFormState({ name: props.name });

  if (!props.name) return null;

  return <Textarea ref={ref} error={formState.errors[props.name]?.message as string} {...props} />;
});

export default TextareaForm;
