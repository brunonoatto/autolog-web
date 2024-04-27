import { Control, FieldPath, FieldValues, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import FormField from '@shared/components/form/form-field';
import { Input, TInputProps } from '@shared/design-system/ui/input';

type TLicenseInputProps<T extends FieldValues> = TInputProps & {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
};

export default function LicenseInputFormField<T extends FieldValues>({
  control,
  name,
  label = 'Placa',
  ...inputProps
}: TLicenseInputProps<T>) {
  const { watch } = useFormContext();

  const fieldValue = watch(name);

  return (
    <FormField className="col-span-full" control={control} name={name} label={label}>
      <Input
        className={twMerge(`${fieldValue && 'text-xl font-bold uppercase'} w-48`)}
        maxLength={10}
        placeholder="Informe a placa do veículo"
        {...inputProps}
      />
    </FormField>
  );
}
