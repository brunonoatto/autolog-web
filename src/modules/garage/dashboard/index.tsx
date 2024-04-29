import { useListDashboard } from '@core/service/dashboard';
import { DASHBOARD_CARD_TEST_ID } from '@modules/garage/dashboard/consts';
import { Alert, AlertDescription, AlertTitle } from '@shared/design-system/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/design-system/ui/card';
import LinkButton from '@shared/design-system/ui/link-button';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

import StatusCard from './status-card';
import StatusCardSkeleton from './status-card-skeleton';

export default function Dashboard() {
  const navigate = useNavigateCustom();
  const { data: dashboardItem, isLoading } = useListDashboard();

  const handleSelectCar = (os: string) => {
    navigate(['/garage/orcamento', os]);
  };

  return (
    <Card data-testid={DASHBOARD_CARD_TEST_ID}>
      <CardHeader>
        <CardTitle icon="trello">Dashboard</CardTitle>
      </CardHeader>

      <CardContent>
        {!isLoading && !dashboardItem?.length && (
          <>
            <Alert>
              <AlertTitle>Nenhum orçamento em andamento.</AlertTitle>
              <AlertDescription>
                <LinkButton
                  className="hidden md:inline-block"
                  to="/garage/orcamento"
                  icon="circle-dollar-sign"
                >
                  Adicionar orçamento
                </LinkButton>
              </AlertDescription>
            </Alert>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
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
                <StatusCard
                  key={item.license}
                  item={item}
                  onClick={() => handleSelectCar(item.os)}
                />
              ))}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
