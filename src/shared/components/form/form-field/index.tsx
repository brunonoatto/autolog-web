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

const handleEvents = (event1: TEvent, event2: TEvent, valueAsNumber: boolean, ...params: any[]) => {
  const [_, ...otherParams] = params;
  let [event] = params;

  if (valueAsNumber && event?.target && 'value' in event.target) {
    let newValue: number | string = event.target.value === '' ? NaN : +event.target.value;
    if (isNaN(newValue)) newValue = '';

    event = {
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    };
  }

  const eventParams = [event, ...otherParams];
  event1?.(...eventParams);
  event2?.(...eventParams);
};

export default function FormField<T extends FieldValues>(props: TInputFormProps<T>) {
  const { className, name, label, description, children } = props;
  const { control } = useFormContext();

  const valueAsNumber = children?.props?.type === 'number';

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
                  handleEvents(field.onChange, children.props?.onChange, valueAsNumber, event),
                onBlur: (event: any) =>
                  handleEvents(field.onBlur, children.props?.onBlur, valueAsNumber, event),
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
