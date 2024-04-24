import { Outlet } from 'react-router-dom';

import Menu from '@layout/body-app/main/menu';
import type { TMenu } from '@layout/body-app/main/menu/types';

import styles from './styles.module.css';

type TMainProps = {
  menus: TMenu[];
};

const Main = ({ menus }: TMainProps) => {
  return (
    <main className={styles.content}>
      <div className="md:h-full md:grid md:grid-cols-[15rem_auto]">
        <Menu items={menus} />

        <div className="overflow-hidden md:overflow-auto p-3">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
export default Main;
