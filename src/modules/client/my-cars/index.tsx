import { useClientCars } from '@core/service/client';
import { MY_CARS_CARD_TEST_ID } from '@modules/client/my-cars/consts';
import { ListCars } from '@modules/client/my-cars/list-cars';
import { NotFoundCars } from '@modules/client/my-cars/not-found-cars';
import LoadingCard from '@shared/components/loading-card';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/design-system/ui/card';

export default function ClientMyCars() {
  const { cars, isLoading } = useClientCars();

  return (
    <Card data-testid={MY_CARS_CARD_TEST_ID}>
      <CardHeader>
        <CardTitle icon="warehouse">Meus Veículos</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Queee código mais feio, pensar em algo melhor */}
        {isLoading && <LoadingCard />}

        {!isLoading && !cars?.length && <NotFoundCars />}

        {!isLoading && !!cars?.length && <ListCars cars={cars} />}
      </CardContent>
    </Card>
  );
}
