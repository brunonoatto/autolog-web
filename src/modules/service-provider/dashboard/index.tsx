import { useListDashboard } from '@core/service/autolog';
import AddCarCard from './add-car-card';
import StatusCard from './status-card';
import styles from './styles.module.css';
import StatusCardSkeleton from './status-card-skeleton';
import { useState } from 'react';
import { DashboardItem } from '@core/models/autolog';
import CarModal from './car-modal';

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
          <AddCarCard />
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
