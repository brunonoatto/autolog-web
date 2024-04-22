import { forwardRef } from 'react';

import Select, { type TSelectDefaultProps } from '@shared/design-system_old/select';

const ClientCarSelect = forwardRef<HTMLSelectElement, TSelectDefaultProps>((props, ref) => {
  // const { data: clientCars } = useClientCars({ transfereds: true });

  // const options = buildSelectOptions(clientCars, 'license', (item) => {
  //   const transferedText = item.isTransfered ? '(Transferido) ' : '';
  //   return `${transferedText}${item.license} - ${item.brand} ${item.model} ${item.year}`;
  // });

  return <Select options={[]} ref={ref} {...props} />;
});

export default ClientCarSelect;
