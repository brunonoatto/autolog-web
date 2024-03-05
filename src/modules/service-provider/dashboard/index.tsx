import { useListDashboard } from '@core/service/autolog';
import StatusCard from './status-card';
import styles from './styles.module.css';
import StatusCardSkeleton from './status-card-skeleton';
import { useState } from 'react';
import { DashboardItem } from '@core/models/autolog';
import CarModal from './car-modal';
import LinkButton from '@shared/components/link-button';

const Dashboard = () => {
  const [selectedCar, setSelectedCar] = useState<DashboardItem>();
  const { data: cars, isLoading, isRefetching } = useListDashboard();

  const handleSelectCar = (car: DashboardItem) => {
    setSelectedCar(car);
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

          {selectedCar && <CarModal car={selectedCar} onClose={() => setSelectedCar(undefined)} />}
        </>
      )}
    </div>
  );
};

export default Dashboard;
