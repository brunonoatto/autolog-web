import Footer from './footer';
import Header from './header';
import Main from './main';
import styles from './styles.module.css';

export default function BodyApp() {
  return (
    <div className={styles.content}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
