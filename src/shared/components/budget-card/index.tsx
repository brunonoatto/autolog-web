import { useMemo } from 'react';

import type { TCar } from '@core/api/car/types';
import useAuth from '@core/store/context/AuthContext/hook';
import CarInfo from '@shared/components/car-info';
import StatusBadge from '@shared/components/status-badge';
import { BudgetStatusEnum } from '@shared/types/budgetStatus';

// TODO: melhorar a utilização desse componente pra não precisar ser todos campos opcionais
type TBudgetCardProps = {
  car?: TCar;
  clientName?: string;
  garageName?: string;
  status?: BudgetStatusEnum;
  createdDate?: string;
  hover?: boolean;
};

export default function BudgetCard({
  car,
  clientName,
  garageName,
  status,
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
        className="w-full rounded-lg ring-1 ring-primary data-[hover=true]:hover:ring-2 p-2 md:p-3 flex flex-col duration-300 data-[hover=true]:hover:bg-muted"
      >
        {tokenData?.type === 'Garage' && clientName && (
          <div className="flex justify-between text-sm">
            <p className="whitespace-nowrap overflow-hidden text-ellipsis">Cliente: {clientName}</p>
            <p>{createdDate}</p>
          </div>
        )}

        {tokenData?.type === 'Client' && garageName && (
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
    </div>
  );
}
