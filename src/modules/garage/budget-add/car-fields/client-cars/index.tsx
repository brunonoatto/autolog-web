import { useFormContext } from 'react-hook-form';

import { TCar } from '@core/api/car/types';
import useBudgetAddContext from '@core/store/context/BudgetAddContext/hook';
import type { TBudgetAddFormType } from '@core/store/context/types/budget-add';
import CarCard from '@shared/components/car-card';
import { HoverButton } from '@shared/components/hover-button';

export default function ClientCars() {
  const handleSelectedClientCar = useBudgetAddContext((prop) => prop.handleSelectedClientCar);
  const handleClearSelectedClientCar = useBudgetAddContext(
    (prop) => prop.handleClearSelectedClientCar,
  );
  const cars = useBudgetAddContext((prop) => prop.selectedClientCars);

  const { watch } = useFormContext<TBudgetAddFormType>();

  const selectedCarId = watch('car.id');

  const selectedCar = cars.find((c) => c.id === selectedCarId);

  const handleSelectedCar = (car: TCar) => {
    handleSelectedClientCar(car);
  };

  const handleClearSelectedCar = () => {
    handleClearSelectedClientCar();
  };

  if (!cars?.length) {
    return null;
  }

  if (selectedCar) {
    return (
      <CarCard
        key={selectedCar.license}
        car={selectedCar}
        isSelected
        onClearClick={handleClearSelectedCar}
      />
    );
  }

  return (
    <div className="col-span-full">
      <div>Veículos do Cliente:</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        {cars.map((car) => (
          <HoverButton
            key={car.license}
            isSelected={selectedCarId === car.id}
            onClick={() => handleSelectedCar(car)}
          >
            <CarCard key={car.license} car={car} />
          </HoverButton>
        ))}
      </div>
    </div>
  );
}
