import Header from './header';
import Main from './main';
import Footer from './footer';
import styles from './styles.module.css';
import Loading from './loading';

const BodyApp = () => {
  return (
    <>
      <Loading />
      <div className={styles.content}>
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
};
export default BodyApp;
