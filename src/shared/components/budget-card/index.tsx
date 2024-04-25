import { useMemo } from 'react';

import type { TCar } from '@core/api/car/types';
import useAuth from '@core/store/context/hooks/useAuth';
import CarInfo from '@shared/components/car-info';
import StatusBadge from '@shared/components/status-badge';
import { CardTitle } from '@shared/design-system/ui/card';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

// TODO: melhorar a utilização desse componente pra não precisar ser todos campos opcionais
type TBudgetCardProps = {
  car?: TCar;
  clientName?: string;
  garageName?: string;
  status?: BudgetStatusEnum;
  observation?: string;
  createdDate?: string;
  hover?: boolean;
};

export default function BudgetCard({
  car,
  clientName,
  garageName,
  status,
  observation,
  createdDate,
  hover = false,
}: TBudgetCardProps) {
  const { getTokenData } = useAuth();

  const tokenData = useMemo(() => getTokenData(), [getTokenData]);

  if (!status || !car) return null;

  return (
    <div className="space-y-4">
      <div
        data-hover={hover}
        className="w-full rounded-lg ring-1 ring-primary data-[hover=true]:hover:ring-2 p-2 md:p-3 flex flex-col duration-300 data-[hover=true]:hover:scale-[1.01]"
      >
        {tokenData?.type === 'garage' && clientName && (
          <div className="flex justify-between text-sm">
            <p className="whitespace-nowrap overflow-hidden text-ellipsis">Cliente: {clientName}</p>
            <p>{createdDate}</p>
          </div>
        )}

        {tokenData?.type === 'client' && garageName && (
          <div className="flex justify-between text-sm">
            <p className="whitespace-nowrap overflow-hidden text-ellipsis">Ofinina: {garageName}</p>
            <p>{createdDate}</p>
          </div>
        )}

        <div className="flex justify-between">
          <div>
            <CarInfo {...car} />

            {!clientName && createdDate && <p className="text-left">{createdDate}</p>}
          </div>

          <div className="mt-auto">
            <StatusBadge status={status} />
          </div>
        </div>
      </div>

      {observation && (
        <>
          <CardTitle icon="notebook-pen" size="lg">
            Observação
          </CardTitle>
          {observation}
        </>
      )}
    </div>
  );
}
