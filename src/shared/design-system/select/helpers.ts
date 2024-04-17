import type { TSelectOption } from '.';

export const buildSelectOptions = <T>(
  options: T[] | undefined,
  valueProp: keyof T,
  titleProp: keyof T | ((item: T) => string),
): TSelectOption[] => {
  return (
    options?.map((option) => ({
      value: option[valueProp] as string,
      title: typeof titleProp === 'function' ? titleProp(option) : (option[titleProp] as string),
    })) || []
  );
};
