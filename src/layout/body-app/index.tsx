import Footer from '@layout/body-app/footer';
import Header from '@layout/body-app/header';
import Main from '@layout/body-app/main';
import Menu from '@layout/menu';
import { TMenu } from '@layout/menu/types';

import styles from './styles.module.css';

type TBodyAppProps = {
  children: React.ReactNode;
  menus: TMenu[];
};

export default function BodyApp({ children, menus }: TBodyAppProps) {
  return (
    <div className={styles.content}>
      <Header />

      <Main>
        <div className="md:h-full md:grid md:grid-cols-[15rem_auto]">
          <Menu items={menus} />

          <div className="overflow-hidden md:overflow-auto p-3">{children}</div>
        </div>
      </Main>

      <Footer />
    </div>
  );
}
