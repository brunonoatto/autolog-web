import { useNavigate } from 'react-router-dom';

import { useListDashboard } from '@core/service/dashboard';
import { DashboardItem } from '@core/models/dashboard';
import { ROUTES_PATH } from '@core/router/consts';
import LinkButton from '@shared/design-system/link-button';
import StatusCard from './status-card';
import StatusCardSkeleton from './status-card-skeleton';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: cars, isLoading, isRefetching } = useListDashboard();

  const handleSelectCar = (item: DashboardItem) => {
    navigate(`${ROUTES_PATH.garageBudgetView}/${item.os}`);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoading || isRefetching ? (
        <>
          <StatusCardSkeleton />
          <StatusCardSkeleton />
          <StatusCardSkeleton />
          <StatusCardSkeleton />
          <StatusCardSkeleton />
        </>
      ) : (
        <>
          <LinkButton to="/garage/add-veiculo" className="md:hidden h-20 md:h-32">
            <h3>Adicionar veiculo</h3>
          </LinkButton>

          {cars?.map((car) => (
            <StatusCard key={car.license} car={car} onClick={() => handleSelectCar(car)} />
          ))}
        </>
      )}
    </div>
  );
}
