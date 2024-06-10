import { BudgetListItem } from '@core/models/budget/BudgetListItem';
import BudgetCard from '@shared/components/budget-card';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

type TItem = {
  item: BudgetListItem;
};

export function Item({ item }: TItem) {
  const { os, garageName, car, status, createdDate } = item;

  const navigate = useNavigateCustom();

  const handleGoToBudget = (os: string) => {
    navigate(['/cliente/orcamento', os]);
  };

  return (
    <button key={os} className="w-full" onClick={() => handleGoToBudget(os)}>
      <BudgetCard
        hover
        garageName={garageName}
        car={car}
        status={status}
        createdDate={createdDate}
      />
    </button>
  );
}
