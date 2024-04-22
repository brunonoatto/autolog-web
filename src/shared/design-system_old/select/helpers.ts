import type { TSelectItem } from '@shared/components/form/select-form';

export const buildSelectOptions = <T>(
  options: T[] | undefined,
  valueProp: keyof T,
  titleProp: keyof T | ((item: T) => string),
): TSelectItem[] => {
  return (
    options?.map((option) => ({
      value: option[valueProp] as string,
      label: typeof titleProp === 'function' ? titleProp(option) : (option[titleProp] as string),
    })) || []
  );
};
