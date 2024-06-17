import { useFormContext } from 'react-hook-form';

import { useClientCars } from '@core/service/client';
import { TTransferCarForm } from '@modules/client/transfer-car';
import CarCard from '@shared/components/car-card';
import { CardTitle } from '@shared/design-system/ui/card';
import { FormControl, FormField, FormItem, FormMessage } from '@shared/design-system/ui/form';

export default function SelectCarToTransfer() {
  const { control, setValue, watch } = useFormContext<TTransferCarForm>();
  const { cars } = useClientCars();

  const selectedCarId = watch('carId');

  const handleCardClick = (carId: string) => {
    setValue('carId', carId, { shouldValidate: true });
  };

  const handleClearSelectedCar = () => {
    setValue('carId', '');
  };

  return (
    <>
      <CardTitle size="lg">Selecione o veículo que deseja transferir</CardTitle>

      <FormField
        control={control}
        name="carId"
        render={() => {
          return (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cars.map((car) => {
                    return (
                      <CarCard
                        key={car.license}
                        car={car}
                        isSelected={selectedCarId === car.id}
                        onClick={handleCardClick}
                        onClearClick={handleClearSelectedCar}
                      />
                    );
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
