import { TCarGetResponse } from '@core/api/client/types';
import IdentificationCar from '@modules/garage/dashboard/status-card/identification-car';
import DashboardButton from '@shared/components/dashboard-button';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

type TListCarsProps = {
  cars: TCarGetResponse[];
};

export function ListCars({ cars }: TListCarsProps) {
  const navigate = useNavigateCustom();

  const handleCarClick = (license: string) => () => {
    navigate(['/cliente', license]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cars?.map(({ license, brand, model, year }) => (
        <DashboardButton key={license} className="md:min-h-24" onClick={handleCarClick(license)}>
          <IdentificationCar license={license} brand={brand} model={model} year={year} />
        </DashboardButton>
      ))}
    </div>
  );
}
