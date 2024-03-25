import { twMerge } from 'tailwind-merge';

import { TCar } from '@core/api/car/types';

type TCarInfoProps = TCar & { className?: string };

export default function CarInfo({ className, license, brand, model, year }: TCarInfoProps) {
  return (
    <div className={twMerge('text-left', className)}>
      <h3 className="font-semibold">{license}</h3>

      <h5>
        {brand} - {model} - {year}
      </h5>
    </div>
  );
}
