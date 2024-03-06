import { Outlet } from 'react-router-dom';

import styles from './styles.module.css';

const Main = () => {
  return (
    <main className={styles.content}>
      <Outlet />
    </main>
  );
};
export default Main;
