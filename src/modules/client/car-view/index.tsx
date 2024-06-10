import { useParams } from 'react-router-dom';

import { useGetCar } from '@core/service/car';
import BudgetsCar from '@modules/client/car-view/budgets-car';
import TimelineCar from '@modules/client/car-view/timeline-car';
import { RenderLoadingData } from '@shared/components/render-loading-data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@shared/design-system/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/design-system/ui/tabs';
import carName from '@shared/helpers/string/carName';

export default function ClientCarView() {
  const { license: licenseParam } = useParams();
  const { car, isLoading } = useGetCar(licenseParam || '');

  return (
    <Card>
      <CardHeader>
        <CardTitle icon="car">Veículo {car?.license}</CardTitle>
        <CardDescription>{!!car && carName(car)}</CardDescription>
      </CardHeader>

      <CardContent>
        <RenderLoadingData
          isLoading={isLoading}
          hasData={!!car}
          notFoundText="Veículo não encontrado."
        >
          <Tabs defaultValue="budgets">
            <TabsList>
              <TabsTrigger value="budgets">Orçamentos</TabsTrigger>
              <TabsTrigger value="timeline">Histórico</TabsTrigger>
            </TabsList>
            <TabsContent value="budgets">
              <BudgetsCar />
            </TabsContent>
            <TabsContent value="timeline">
              <TimelineCar />
            </TabsContent>
          </Tabs>
        </RenderLoadingData>
      </CardContent>
    </Card>
  );
}
