import type { TSelectOption } from '.';

export const buildSelectOptions = <T>(
  options: T[] | undefined,
  valueProp: keyof T,
  titleProp: keyof T,
): TSelectOption[] => {
  return (
    options?.map((option) => ({
      value: option[valueProp] as string,
      title: option[titleProp] as string,
    })) || []
  );
};
