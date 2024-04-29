import { useClientCars } from '@core/service/client';
import { MY_CARS_CARD_TEST_ID } from '@modules/client/my-cars/consts';
import IdentificationCar from '@modules/garage/dashboard/status-card/identification-car';
import DashboardButton from '@shared/components/dashboard-button';
import { Alert, AlertDescription, AlertTitle } from '@shared/design-system/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/design-system/ui/card';
import LinkButton from '@shared/design-system/ui/link-button';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

export default function ClientMyCars() {
  const navigate = useNavigateCustom();
  const { data: cars } = useClientCars();

  const handleCarClick = (license: string) => () => {
    navigate(['/cliente', license]);
  };

  return (
    <Card data-testid={MY_CARS_CARD_TEST_ID}>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars?.map(({ license, brand, model, year }) => (
            <DashboardButton
              key={license}
              className="md:min-h-24"
              onClick={handleCarClick(license)}
            >
              <IdentificationCar license={license} brand={brand} model={model} year={year} />
            </DashboardButton>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
