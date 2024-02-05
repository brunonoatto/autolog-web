import Header from './header';
import Main from './main';
import Footer from './footer';
import styles from './styles.module.css';

const BodyApp = () => {
  return (
    <div className={styles.content}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
export default BodyApp;
