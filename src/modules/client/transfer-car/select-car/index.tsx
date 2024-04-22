import { useFormContext } from 'react-hook-form';

import { useClientCars } from '@core/service/client';
import { TTransferCarForm } from '@modules/client/transfer-car';
import CarCard from '@modules/client/transfer-car/select-car/car-card';
import { CardTitle } from '@shared/design-system/ui/card';
import { FormControl, FormField, FormItem, FormMessage } from '@shared/design-system/ui/form';

export default function SelectCarToTransfer() {
  const { control } = useFormContext<TTransferCarForm>();
  const { data: clientCars } = useClientCars();

  return (
    <>
      <CardTitle size="lg">Selecione o carro que deseja transferir</CardTitle>

      <FormField
        control={control}
        name="cpfToTransfer"
        render={() => {
          return (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {clientCars?.map((car) => {
                    return <CarCard key={car.license} car={car} />;
                  })}
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
  );
}
