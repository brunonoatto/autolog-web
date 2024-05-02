import { useFormContext } from 'react-hook-form';

import type { TCar } from '@core/api/car/types';
import useBudgetAddContext from '@core/store/context/BudgetAddContext/hook';
import type { TBudgetAddFormType } from '@core/store/context/types/budget-add';
import { Button } from '@shared/design-system/ui/button';

type TClientCarButtonProps = {
  car: TCar;
};

export default function ClientCarButton({ car }: TClientCarButtonProps) {
  const handleSelectedClientCar = useBudgetAddContext((prop) => prop.handleSelectedClientCar);

  const { watch } = useFormContext<TBudgetAddFormType>();

  const license = watch('license');

  const handleSelectedCar = (car: TCar) => (event: React.MouseEvent) => {
    event?.preventDefault();
    handleSelectedClientCar(car);
  };

  return (
    <Button
      variant={license === car.license ? 'outline-active' : 'outline'}
      size="sm"
      onClick={handleSelectedCar(car)}
    >
      {car.license}
    </Button>
  );
}
