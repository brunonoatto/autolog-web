import type { SelectProps } from '@radix-ui/react-select';

import { useClientCars } from '@core/service/client';
import { buildSelectOptions } from '@shared/design-system/helpers/select';
import { Label } from '@shared/design-system/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/design-system/ui/select';

type TClientCarSelect = SelectProps & {
  label: string;
};

export default function ClientCarSelect(props: TClientCarSelect) {
  const { label, ...otherProps } = props;
  const { data: clientCars } = useClientCars({ transfereds: true });

  const items = buildSelectOptions(clientCars, 'license', (item) => {
    const transferedText = item.isTransfered ? '(Transferido) ' : '';
    return `${transferedText}${item.license} - ${item.brand} ${item.model} ${item.year}`;
  });

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select {...otherProps}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um veículo" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
