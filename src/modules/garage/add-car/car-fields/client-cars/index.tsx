import { useFormContext } from 'react-hook-form';

import type { TCar } from '@core/api/car/types';
import type { TGarageAddCarFormType } from '@core/store/context/GarageAddCarContext';
import useGarageAddCarContext from '@core/store/context/hooks/useGarageAddCar';
import Button from '@shared/design-system/button';

export default function ClientCars() {
  const handleSelectedClientCar = useGarageAddCarContext((prop) => prop.handleSelectedClientCar);
  const selectedClient = useGarageAddCarContext((prop) => prop.selectedClient);

  const { watch } = useFormContext<TGarageAddCarFormType>();

  const selectedLicense = watch('license');

  const handleSelectedCar = (car: TCar) => (event: React.MouseEvent) => {
    event?.preventDefault();
    handleSelectedClientCar(car);
  };

  if (!selectedClient || !selectedClient.cars?.length) {
    return null;
  }

  return (
    <div className="col-span-full">
      <div className="">Carros do Cliente:</div>
      <div className=" flex gap-2 p-2 overflow-x-auto">
        {selectedClient?.cars?.map((car) => {
          return (
            // <Tooltip
            //   key={license}
            //   title={
            //     <>
            //       {brand} {model} {year}
            //     </>
            //   }
            // >
            <Button
              key={car.license}
              type="button"
              color={selectedLicense === car.license ? 'active' : 'secondary'}
              size="medium"
              onClick={handleSelectedCar(car)}
            >
              {car.license}
            </Button>
            // </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
