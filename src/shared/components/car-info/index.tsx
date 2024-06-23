import type { TCar } from '@core/api/car/types';
import { cn } from '@shared/design-system/helpers/utils';
import carName from '@shared/helpers/string/carName';

type TCarInfoProps = TCar & { className?: string };

export default function CarInfo({ className, ...car }: TCarInfoProps) {
  return (
    <div className={cn('text-left', className)}>
      <h3 className="font-semibold">{car.license}</h3>

      <h5>{carName(car)}</h5>
    </div>
  );
}
