import { useParams } from 'react-router-dom';

import { useListBudgetsCar } from '@core/service/budget';
import { Item } from '@modules/client/car-view/budgets-car/item';
import { RenderLoadingData } from '@shared/components/render-loading-data';

export default function BudgetsCar() {
  const { license: licenseParam } = useParams();
  const { budgets, isLoading } = useListBudgetsCar(licenseParam || '');

  return (
    <RenderLoadingData
      isLoading={isLoading}
      hasData={!!budgets.length}
      notFoundTitle="Este veículo ainda não realizou nenhum Orçamento."
    >
      <div className="space-y-2">{budgets?.map((item) => <Item key={item.os} item={item} />)}</div>
    </RenderLoadingData>
  );
}
