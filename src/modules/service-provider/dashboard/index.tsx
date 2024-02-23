import { StatusCarEnum } from '@core/models/car';
import AddCarCard from './add-car-card';
import StatusCard, { TStatusCardProps } from './status-card';
import styles from './styles.module.css';

const cars: TStatusCardProps[] = [
  {
    license: 'AAA4323',
    brand: 'Ford',
    model: 'Fiesta 1.6',
    year: 2015,
    status: StatusCarEnum.WaitingBudget,
  },
  {
    license: 'BBB4323',
    brand: 'Volkswagen',
    model: 'Polo',
    year: 2011,
    status: StatusCarEnum.WaitingBudgetApproval,
  },
  {
    license: 'VVV4323',
    brand: 'Fiat',
    model: 'Uno',
    year: 1998,
    status: StatusCarEnum.ApprovedBudget,
  },
  {
    license: 'DDD4323',
    brand: 'Peugeot',
    model: '206',
    year: 2020,
    status: StatusCarEnum.BudgetRejected,
  },
  {
    license: 'DAD4323',
    brand: 'Peugeot',
    model: '206',
    year: 2020,
    status: StatusCarEnum.RunningService,
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
