import { Warehouse } from 'lucide-react';

import { useClientCars } from '@core/service/client';
import { MY_CARS_CARD_TEST_ID } from '@modules/client/my-cars/consts';
import { ListCars } from '@modules/client/my-cars/list-cars';
import { NotFoundCars } from '@modules/client/my-cars/not-found-cars';
import { RenderLoadingData } from '@shared/components/render-loading-data';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/design-system/ui/card';

export default function ClientMyCars() {
  const { cars, isLoading } = useClientCars();

  return (
    <Card data-testid={MY_CARS_CARD_TEST_ID}>
      <CardHeader>
        <CardTitle icon={Warehouse}>Meus Veículos</CardTitle>
      </CardHeader>

      <CardContent>
        <RenderLoadingData
          isLoading={isLoading}
          hasData={!!cars.length}
          notFoundElement={<NotFoundCars />}
        >
          <ListCars cars={cars} />
        </RenderLoadingData>
      </CardContent>
    </Card>
  );
}
