import { useFormContext } from 'react-hook-form';

import type { TCar } from '@core/api/car/types';
import { TTransferCarForm } from '@modules/client/transfer-car';
import CarInfo from '@shared/components/car-info';
import ContainerSelected from '@shared/components/container-selected';

type TCarCardProps = {
  car: TCar;
};

export default function CarCard({ car }: TCarCardProps) {
  const { setValue, watch } = useFormContext<TTransferCarForm>();

  const licenseSelected = watch('license');

  const handleCardClick = () => {
    setValue('license', car.license);
  };

  if (licenseSelected && licenseSelected !== car.license) {
    return null;
  }

  return (
    <button
      type="button"
      data-hover={!licenseSelected}
      className="border-2 border-teal-700 ring-teal-500 rounded-lg focus:outline-teal-500 duration-300 data-[hover=true]:hover:border-teal-500 data-[hover=true]:hover:scale-[1.03] data-[hover=true]:hover:md:scale-[1.05]"
      onClick={() => handleCardClick()}
    >
      {licenseSelected && (
        <ContainerSelected className="border-0">
          <CarInfo className="p-2" key={car.license} {...car} />
        </ContainerSelected>
      )}
      {!licenseSelected && <CarInfo className="p-2" key={car.license} {...car} />}
    </button>
  );
}
