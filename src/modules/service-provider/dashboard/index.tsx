import AddCarCard from './add-car-card';
import StatusCard, { TStatusCardProps } from './status-card';
import styles from './styles.module.css';

const cars: TStatusCardProps[] = [
  {
    license: 'AAA4323',
    manufacturer: 'Ford',
    model: 'Fiesta 1.6',
    year: 2015,
    status: 'WaitingBudget',
  },
  {
    license: 'BBB4323',
    manufacturer: 'Volkswagen',
    model: 'Polo',
    year: 2011,
    status: 'WaitingBudgetApproval',
  },
  {
    license: 'VVV4323',
    manufacturer: 'Fiat',
    model: 'Uno',
    year: 1998,
    status: 'ApprovedBudget',
  },
  {
    license: 'DDD4323',
    manufacturer: 'Peugeot',
    model: '206',
    year: 2020,
    status: 'BudgetRejected',
  },
  {
    license: 'DDD4323',
    manufacturer: 'Peugeot',
    model: '206',
    year: 2020,
    status: 'RunningService',
  },
];

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <AddCarCard />
      {cars.map((car) => (
        <StatusCard key={car.license} {...car} />
      ))}
    </div>
  );
};

export default Dashboard;
