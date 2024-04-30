import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Control, FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import type { TSelectItem } from '@shared/components/form/form-field-select';
import { cn } from '@shared/design-system/helpers/utils';
import { Button } from '@shared/design-system/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@shared/design-system/ui/command';
import { COMBOBOX_OPTIONS_TEST_ID } from '@shared/design-system/ui/consts';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/design-system/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/design-system/ui/popover';

export type TComboboxDefaultProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

export type TComboboxProps<T extends FieldValues> = TComboboxDefaultProps<T> & {
  items: TSelectItem[];
};

/* 
  Este componente obrigatóriamente deve pertencer a um formulário.
  Caso precise de um sem formulário renomear esse para ComboboxForm e criar outro com o mesmo nome.
*/
export default function Combobox<T extends FieldValues>({
  control,
  name,
  label,
  items,
  disabled = false,
  onChange,
}: TComboboxProps<T>) {
  const [open, setOpen] = useState(false);
  const { setValue } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="inline">{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  name={field.name}
                  aria-expanded={open}
                  disabled={disabled}
                  className={cn('block w-full ', !field.value && 'text-muted-foreground')}
                >
                  <div className="flex justify-between">
                    {field.value
                      ? items.find((item) => item.value === field.value)?.label
                      : 'Selecione um item'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </div>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Procurar item..." />
                <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
                <CommandGroup>
                  <CommandList data-testid={COMBOBOX_OPTIONS_TEST_ID}>
                    {items.map((item) => {
                      return (
                        <CommandItem
                          value={item.label}
                          key={item.value}
                          onSelect={() => {
                            setValue(name, item.value);
                            onChange?.(item.value);
                            setOpen(false);
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
                      );
                    })}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {/* <FormDescription>This is the item that will be used in the dashboard.</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );

  // return (
  //   <Popover open={open} onOpenChange={setOpen}>
  //     <PopoverTrigger asChild>
  //       <Button
  //         variant="outline"
  //         role="combobox"
  //         aria-expanded={open}
  //         className="w-[200px] justify-between"
  //       >
  //         {value ? items.find((item) => item.value === value)?.label : 'Selecione um item...'}
  //         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
  //       </Button>
  //     </PopoverTrigger>
  //     <PopoverContent className="w-[200px] p-0">
  //       <Command>
  //         <CommandInput {...otherProps} ref={ref} placeholder="Digite para procurar..." />
  //         <CommandEmpty>No item found.</CommandEmpty>
  //         <CommandGroup>
  //           {items.map((item) => (
  //             <CommandItem
  //               key={item.value}
  //               value={item.value}
  //               onSelect={(currentValue) => {
  //                 onChange?.(currentValue === value ? '' : currentValue);
  //                 setOpen(false);
  //               }}
  //             >
  //               <Check
  //                 className={cn(
  //                   'mr-2 h-4 w-4',
  //                   value === item.value ? 'opacity-100' : 'opacity-0',
  //                 )}
  //               />
  //               {item.label}
  //             </CommandItem>
  //           ))}
  //         </CommandGroup>
  //       </Command>
  //     </PopoverContent>
  //   </Popover>
  // );
}
