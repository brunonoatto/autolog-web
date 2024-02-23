import { useListDashboard } from '@core/service/autolog';
import AddCarCard from './add-car-card';
import StatusCard from './status-card';
import styles from './styles.module.css';
import StatusCardSkeleton from './status-card-skeleton';

const Dashboard = () => {
  const { data: cars, isLoading } = useListDashboard();

  return (
    <div className={styles.container}>
      {isLoading ? (
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
          {cars?.map((car) => <StatusCard key={car.license} {...car} />)}
        </>
      )}
    </div>
  );
};

export default Dashboard;
