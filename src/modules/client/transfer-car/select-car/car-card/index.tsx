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

  const handleClearSelectedCar = () => {
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
        data-hover={!licenseSelected}
        className="block p-0 h-auto border-2 border-border ring-primary rounded-lg focus:outline-primary duration-300 data-[hover=false]:hover:bg-background data-[hover=false]:hover:cursor-default data-[hover=true]:hover:scale-[1.03] data-[hover=true]:hover:md:scale-[1.05]"
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
