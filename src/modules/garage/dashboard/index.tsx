import { useGarageDashboard } from '@core/service/dashboard';
import { DASHBOARD_CARD_TEST_ID } from '@modules/garage/dashboard/consts';
import { DashboardGrid } from '@modules/garage/dashboard/dashboard-grid';
import StatusCard from '@modules/garage/dashboard/status-card';
import { StatusCardSkeletons } from '@modules/garage/dashboard/status-card-skeletons';
import { RenderLoadingData } from '@shared/components/render-loading-data';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/design-system/ui/card';
import LinkButton from '@shared/design-system/ui/link-button';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

export default function Dashboard() {
  const navigate = useNavigateCustom();
  const { data: dashboardItem, isLoading } = useGarageDashboard();

  const handleSelectCar = (os: string) => {
    navigate(['/garage/orcamento', os]);
  };

  return (
    <Card data-testid={DASHBOARD_CARD_TEST_ID}>
      <CardHeader>
        <CardTitle icon="trello">Dashboard</CardTitle>
      </CardHeader>

      <CardContent>
        <RenderLoadingData
          isLoading={isLoading}
          hasData={!!dashboardItem?.length}
          loadingElement={<StatusCardSkeletons />}
          notFoundTitle="Nenhum orçamento em andamento."
          notFoundDescription={
            <LinkButton to="/garage/orcamento" icon="circle-dollar-sign">
              Adicionar orçamento
            </LinkButton>
          }
        >
          <DashboardGrid>
            <LinkButton className="md:hidden h-16" to="/garage/orcamento">
              Adicionar Orçamento
            </LinkButton>

            {dashboardItem?.map((item) => (
              <StatusCard key={item.license} item={item} onClick={() => handleSelectCar(item.os)} />
            ))}
          </DashboardGrid>
        </RenderLoadingData>
      </CardContent>
    </Card>
  );
}
