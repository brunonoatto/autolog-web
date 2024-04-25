import { useClientCars } from '@core/service/client';
import IdentificationCar from '@modules/garage/dashboard/status-card/identification-car';
import DashboardButton from '@shared/components/dashboard-button';
import { Alert, AlertDescription, AlertTitle } from '@shared/design-system/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/design-system/ui/card';
import LinkButton from '@shared/design-system/ui/link-button';
import useNavigateApp from '@shared/hooks/useNavigateApp';

export default function ClientMyCars() {
  const navigate = useNavigateApp();
  const { data: cars } = useClientCars();

  const handleCarClick = (license: string) => () => {
    navigate(['/cliente', license]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle icon="warehouse">Meus Veículos</CardTitle>
      </CardHeader>

      <CardContent>
        {!cars?.length && (
          <Alert>
            <AlertTitle>Você não possui nenhum veículo cadastrado.</AlertTitle>
            <AlertDescription>
              <LinkButton icon="car" to="/cliente/cadastrar-veiculo">
                Cadastrar seu veículo
              </LinkButton>
            </AlertDescription>
          </Alert>
        )}

        {cars?.map(({ license, brand, model, year }) => (
          <DashboardButton key={license} className="md:min-h-24" onClick={handleCarClick(license)}>
            <IdentificationCar license={license} brand={brand} model={model} year={year} />
          </DashboardButton>
        ))}
      </CardContent>
    </Card>
  );
}
