import { Check, ChevronsUpDown, Command } from 'lucide-react';
import { Control, FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import type { TSelectItem } from '@shared/components/form/form-field-select';
import { cn } from '@shared/design-system/helpers/utils';
import { Button } from '@shared/design-system/ui/button';
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@shared/design-system/ui/command';
import {
  FormControl,
  FormDescription,
  FormField as FormFieldUI,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/design-system/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/design-system/ui/popover';

type TInputFormProps<T extends FieldValues> = {
  items: TSelectItem[];
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;
};

export default function FormFieldCombobox<T extends FieldValues>(props: TInputFormProps<T>) {
  const { items, name, label, description } = props;
  const { control, setValue } = useFormContext();

  return (
    <FormFieldUI
      control={control}
      name="item"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'w-[200px] justify-between',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value
                    ? items.find((item) => item.value === field.value)?.label
                    : 'Seleciona um item'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Pesquise..." />
                <CommandEmpty>No item found.</CommandEmpty>
                <CommandGroup>
                  {items.map((item) => (
                    <CommandItem
                      value={item.label}
                      key={item.value}
                      onSelect={() => {
                        setValue(name, item.value);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          item.value === field.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
