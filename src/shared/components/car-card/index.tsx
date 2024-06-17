import { MouseEventHandler } from 'react';

import type { TCar } from '@core/api/car/types';
import CarInfo from '@shared/components/car-info';
import ContainerSelected from '@shared/components/container-selected';
import { Button } from '@shared/design-system/ui/button';

type TCarCardProps = {
  car: TCar;
  isSelected: boolean;
  onClick: (carId: string) => void;
  onClearClick: () => void;
};

export default function CarCard({ car, isSelected, onClick, onClearClick }: TCarCardProps) {
  const handleClearSelectedCar: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    onClearClick();
  };

  const CarInfoComponent = () => <CarInfo className="p-2 text-wrap" key={car.license} {...car} />;

  return (
    <Button
      type="button"
      variant="outline"
      data-selected={isSelected}
      className="block max-w-[650px] p-0 h-auto border-2 border-border ring-primary rounded-lg focus:outline-primary duration-300 data-[selected=true]:col-span-full data-[selected=true]:hover:bg-background data-[selected=true]:hover:cursor-default data-[selected=false]:hover:scale-[1.03] data-[selected=false]:hover:md:scale-[1.05]"
      onClick={() => onClick(car.id)}
    >
      {isSelected && (
        <ContainerSelected className="border-0" title="Veículo selecionado">
          <CarInfoComponent />

          <Button
            className="block"
            type="button"
            variant={'link'}
            size="sm"
            onClick={handleClearSelectedCar}
          >
            Remover seleção
          </Button>
        </ContainerSelected>
      )}

      {!isSelected && <CarInfoComponent />}
    </Button>
  );
}
