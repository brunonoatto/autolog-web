import { useListDashboard } from '@core/service/dashboard';
import { CardTitle } from '@shared/design-system/ui/card';
import LinkButton from '@shared/design-system/ui/link-button';
import useNavigateApp from '@shared/hooks/useNavigateApp';

import StatusCard from './status-card';
import StatusCardSkeleton from './status-card-skeleton';

export default function Dashboard() {
  const navigate = useNavigateApp();
  const { data: dashboardItem, isLoading, isRefetching } = useListDashboard();

  const isLoadingDashboard = isLoading || isRefetching;

  const handleSelectCar = (os: string) => {
    navigate(['/garage/orcamento', os]);
  };

  return (
    <div className="space-y-4">
      <CardTitle icon="trello">Dashboard</CardTitle>

      {!isLoadingDashboard && !dashboardItem?.length && (
        <>
          <p>Nenhum orçamento em andamento</p>
          <LinkButton
            className="hidden md:inline-block"
            to="/garage/orcamento"
            icon="circle-dollar-sign"
          >
            Adicionar orçamento
          </LinkButton>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoadingDashboard ? (
          <>
            <StatusCardSkeleton />
            <StatusCardSkeleton />
            <StatusCardSkeleton />
            <StatusCardSkeleton />
            <StatusCardSkeleton />
          </>
        ) : (
          <>
            <LinkButton className="md:hidden h-16" to="/garage/orcamento">
              Adicionar Orçamento
            </LinkButton>

            {dashboardItem?.map((item) => (
              <StatusCard key={item.license} item={item} onClick={() => handleSelectCar(item.os)} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
