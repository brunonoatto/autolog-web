/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import { Control, FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField as FormFieldUI,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/design-system/ui/form';

type TEventParams = any[];
type TEvent = (...event: TEventParams) => void;

type TInputFormProps<T extends FieldValues> = {
  children: ReactElement;
  className?: string;
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;

  // deletar
  labelProps?: any;
};

const handleEvents = (event1: TEvent, event2: TEvent, ...params: any) => {
  event1?.(...params);
  event2?.(...params);
};

export default function FormField<T extends FieldValues>(props: TInputFormProps<T>) {
  const { className, name, label, description, children } = props;
  const { control } = useFormContext();

  return (
    <FormFieldUI
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              {React.cloneElement(children, {
                ...field,
                onChange: (event: any) =>
                  handleEvents(field.onChange, children.props?.onChange, event),
                onBlur: (event: any) => handleEvents(field.onBlur, children.props?.onBlur, event),
              })}
            </FormControl>

            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
