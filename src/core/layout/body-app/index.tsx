import BigSpinner from './big-spinner';
import Header from './header';
import Main from './main';
import Footer from './footer';
import styles from './styles.module.css';

export default function BodyApp() {
  return (
    <>
      <BigSpinner />
      <div className={styles.content}>
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}
