import { useParams } from 'react-router-dom';

import { useListBudgetsCar } from '@core/service/budget';
import { Item } from '@modules/client/car-view/budgets-car/item';
import LoadingCard from '@shared/components/loading-card';
import { Alert, AlertTitle } from '@shared/design-system/ui/alert';

export default function BudgetsCar() {
  const { license: licenseParam } = useParams();
  const { budgets, isLoading } = useListBudgetsCar(licenseParam || '');

  if (isLoading) {
    return <LoadingCard />;
  }

  if (!budgets.length) {
    return (
      <Alert>
        <AlertTitle>Este veículo ainda não realizou nenhum Orçamento.</AlertTitle>
      </Alert>
    );
  }

  return (
    <div className="space-y-2">{budgets?.map((item) => <Item key={item.os} item={item} />)}</div>
  );
}
