import { MouseEventHandler } from 'react';
import { useFormContext } from 'react-hook-form';

import type { TCar } from '@core/api/car/types';
import { TTransferCarForm } from '@modules/client/transfer-car';
import CarInfo from '@shared/components/car-info';
import ContainerSelected from '@shared/components/container-selected';
import { Button } from '@shared/design-system/ui/button';

type TCarCardProps = {
  car: TCar;
};

export default function CarCard({ car }: TCarCardProps) {
  const { setValue, watch } = useFormContext<TTransferCarForm>();

  const licenseSelected = watch('license');

  const handleCardClick = () => {
    setValue('license', car.license);
  };

  const handleClearSelectedCar: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    setValue('license', '');
  };

  if (licenseSelected && licenseSelected !== car.license) {
    return null;
  }

  const CarInfoComponent = () => <CarInfo className="p-2 text-wrap" key={car.license} {...car} />;

  return (
    <>
      <Button
        type="button"
        variant="outline"
        data-selected={!!licenseSelected}
        className="block p-0 h-auto border-2 border-border ring-primary rounded-lg focus:outline-primary duration-300 data-[selected=true]:col-span-full data-[selected=true]:hover:bg-background data-[selected=true]:hover:cursor-default data-[selected=false]:hover:scale-[1.03] data-[selected=false]:hover:md:scale-[1.05]"
        onClick={() => handleCardClick()}
      >
        {licenseSelected && (
          <ContainerSelected className="border-0">
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
        {!licenseSelected && <CarInfoComponent />}
      </Button>
    </>
  );
}
