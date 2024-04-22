import type { TComboboxItem } from '@shared/design-system/ui/combobox';

export const buildSelectOptions = <T>(
  options: T[] | undefined,
  valueProp: keyof T,
  titleProp: keyof T | ((item: T) => string),
): TComboboxItem[] => {
  return (
    options?.map((option) => ({
      value: option[valueProp] as string,
      label: typeof titleProp === 'function' ? titleProp(option) : (option[titleProp] as string),
    })) || []
  );
};
