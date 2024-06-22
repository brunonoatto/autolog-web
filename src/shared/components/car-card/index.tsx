import { MouseEventHandler } from 'react';

import type { TCar } from '@core/api/car/types';
import CarInfo from '@shared/components/car-info';
import ContainerTitle from '@shared/components/container-title';
import { Button } from '@shared/design-system/ui/button';

type TCarCardProps = {
  car: TCar;
  isSelected?: boolean;
  onClearClick?: () => void;
};

export default function CarCard({ car, isSelected = false, onClearClick }: TCarCardProps) {
  const handleClearSelectedCar: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    onClearClick?.();
  };

  return (
    <ContainerTitle title="Veículo selecionado" showTitle={isSelected}>
      <CarInfo className="px-2 text-wrap" key={car.license} {...car} />

      {isSelected && onClearClick && (
        <Button
          className="block"
          type="button"
          variant={'link'}
          size="sm"
          onClick={handleClearSelectedCar}
        >
          Remover seleção
        </Button>
      )}
    </ContainerTitle>
  );
}
