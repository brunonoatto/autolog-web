/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { PropsWithChildren, ReactElement } from 'react';
import { Control, FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField as FormFieldUI,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/design-system/ui/form';

type TInputFormProps<T extends FieldValues> = PropsWithChildren & {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;
  children: ReactElement;

  // deletar
  labelProps?: any;
};

export default function FormField<T extends FieldValues>(props: TInputFormProps<T>) {
  const { name, label, description, children } = props;
  const { control } = useFormContext();

  return (
    <FormFieldUI
      control={control}
      name={name}
      render={({ field }) => {
        console.log({ children });
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>{React.cloneElement(children, { ...field })}</FormControl>

            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
