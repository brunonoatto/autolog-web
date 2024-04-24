import Footer from '@layout/body-app/footer';
import Header from '@layout/body-app/header';
import Main from '@layout/body-app/main';
import { TMenu } from '@layout/body-app/main/menu/types';

import styles from './styles.module.css';

type TBodyAppProps = {
  menus: TMenu[];
};

export default function BodyApp({ menus }: TBodyAppProps) {
  return (
    <div className={styles.content}>
      <Header />

      <Main menus={menus} />

      <Footer />
    </div>
  );
}
