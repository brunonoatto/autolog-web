import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';
import { ReactElement } from 'react';
import { Control, FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/design-system/ui/form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TSelectItem = { value: any; label: string };

export type TSelectFormProps<T extends FieldValues> = {
  children: ReactElement;
  className?: string;
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  items: TSelectItem[];
  description?: string;
  placeholder?: string;
};

export type TCustomSelectFormProps<T extends FieldValues> = Omit<TSelectFormProps<T>, 'items'>;

export default function SelectForm<T extends FieldValues>(props: TSelectFormProps<T>) {
  const { name, label, items, description, placeholder } = props;
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
