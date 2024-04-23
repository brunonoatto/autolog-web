import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useListDashboard } from '@core/service/dashboard';
import LinkButton from '@shared/design-system/ui/link-button';

import StatusCard from './status-card';
import StatusCardSkeleton from './status-card-skeleton';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: dashboardItem, isLoading, isRefetching } = useListDashboard();

  const handleSelectCar = (os: string) => {
    navigate(`${ROUTES_PATH.garageBudgetView}/${os}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <LinkButton to={ROUTES_PATH.garageAddBudget} className="md:hidden h-16">
            Adicionar Orçamento
          </LinkButton>

          {dashboardItem?.map((item) => (
            <StatusCard key={item.license} item={item} onClick={() => handleSelectCar(item.os)} />
          ))}
        </>
      )}
    </div>
  );
}
