import LinkButton from '@shared/components/link-button';
import styles from './styles.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <b>AutoLog</b>
      <LinkButton to="/prestador-servico">Login</LinkButton>
    </header>
  );
};

export default Header;
