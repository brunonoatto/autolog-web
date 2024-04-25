import { twMerge } from 'tailwind-merge';

import type { TCar } from '@core/api/car/types';
import carName from '@shared/helpers/string/carName';

type TCarInfoProps = TCar & { className?: string };

export default function CarInfo({ className, ...car }: TCarInfoProps) {
  return (
    <div className={twMerge('text-left', className)}>
      <h3 className="font-semibold">{car.license}</h3>

      <h5>{carName(car)}</h5>
    </div>
  );
}
