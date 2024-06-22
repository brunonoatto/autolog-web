import { useFormContext } from 'react-hook-form';

import type { TCar } from '@core/api/car/types';
import { useClientCars } from '@core/service/client';
import { TTransferCarForm } from '@modules/client/transfer-car';
import CarCard from '@shared/components/car-card';
import { HoverButton } from '@shared/components/hover-button';
import { CardTitle } from '@shared/design-system/ui/card';
import { FormControl, FormField, FormItem, FormMessage } from '@shared/design-system/ui/form';

export default function SelectCarToTransfer() {
  const { control, setValue, watch } = useFormContext<TTransferCarForm>();
  const { cars } = useClientCars();

  const selectedCarId = watch('carId');

  const handleCardClick = (car: TCar) => {
    setValue('carId', car.id, { shouldValidate: true });
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
                  {cars
                    .filter((c) => !selectedCarId || selectedCarId === c.id)
                    .map((car) => {
                      // TODO: não renderizar o HoverButton quando tiver um carro selecionado
                      return (
                        <HoverButton
                          key={car.license}
                          isSelected={selectedCarId === car.id}
                          onClick={() => handleCardClick(car)}
                        >
                          <CarCard
                            car={car}
                            isSelected={selectedCarId === car.id}
                            onClearClick={handleClearSelectedCar}
                          />
                        </HoverButton>
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
