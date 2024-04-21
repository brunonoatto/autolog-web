import { forwardRef } from 'react';
import { useFormState } from 'react-hook-form';

import Textarea, { type TTextareaProps } from '@shared/design-system_old/textarea';

const TextareaForm = forwardRef<HTMLTextAreaElement, TTextareaProps>((props, ref) => {
  const { name } = props || {};
  const formState = useFormState({ name });

  if (!name) return null;

  return <Textarea ref={ref} error={formState.errors[name]?.message as string} {...props} />;
});

export default TextareaForm;
