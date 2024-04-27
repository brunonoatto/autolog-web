/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import { Control, FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import { handleEvents, THandleEventsConfigs } from '@shared/components/form/form-field/helpers';
import {
  FormControl,
  FormDescription,
  FormField as FormFieldUI,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/design-system/ui/form';

type TInputFormProps<T extends FieldValues> = {
  children: ReactElement;
  className?: string;
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;

  isMask?: boolean;
  // deletar
  labelProps?: any;
};

export default function FormField<T extends FieldValues>(props: TInputFormProps<T>) {
  const { className, name, label, description, isMask, children } = props;
  const { control } = useFormContext();

  const eventConfig: THandleEventsConfigs = {
    valueAsNumber: children?.props?.type === 'number',
    isMask,
  };

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
                value: field?.value ?? '',
                onChange: (event: any) =>
                  handleEvents(field.onChange, children.props?.onChange, eventConfig, event),
                onBlur: (event: any) =>
                  handleEvents(field.onBlur, children.props?.onBlur, eventConfig, event),
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
