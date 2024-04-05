import Menu from '@layout/menu';

import Footer from './footer';
import Header from './header';
import Main from './main';
import styles from './styles.module.css';

type TMenuItem = {
  title: string;
  route: string;
};

type TBodyAppProps = {
  children: React.ReactNode;
  menus: TMenuItem[];
};

export default function BodyApp({ children, menus }: TBodyAppProps) {
  return (
    <div className={styles.content}>
      <Header />
      <Main>
        <div className="md:h-full md:grid md:grid-cols-[15rem_auto]">
          <Menu menus={menus} />

          <div className="overflow-hidden md:overflow-auto p-3">{children}</div>
        </div>
      </Main>
      <Footer />
    </div>
  );
}
