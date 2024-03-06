import { useSearchParams } from 'react-router-dom';

import { useListDashboard } from '@core/service/autolog';
import { DashboardItem } from '@core/models/autolog';
import LinkButton from '@shared/design-system/link-button';
import SelectedCarModal from './selected-car-modal';
import StatusCard from './status-card';
import StatusCardSkeleton from './status-card-skeleton';
import styles from './styles.module.css';

export default function Dashboard() {
  const [_, setSearchParams] = useSearchParams();
  const { data: cars, isLoading, isRefetching } = useListDashboard();

  const handleSelectCar = (car: DashboardItem) => {
    const newSearchParam = new URLSearchParams();
    newSearchParam.set('license', car.license);
    setSearchParams(newSearchParam);
  };

  return (
    <div className={styles.container}>
      {isLoading || isRefetching ? (
        <>
          <StatusCardSkeleton />
          <StatusCardSkeleton />
          <StatusCardSkeleton />
          <StatusCardSkeleton />
          <StatusCardSkeleton />
        </>
      ) : (
        <>
          <LinkButton to="/prestador-servico/add-veiculo" className="md:hidden h-20 md:h-32">
            <h3>Adicionar veiculo</h3>
          </LinkButton>

          {cars?.map((car) => (
            <StatusCard key={car.license} {...car} onClick={() => handleSelectCar(car)} />
          ))}

          <SelectedCarModal />
        </>
      )}
    </div>
  );
}
