import { ROUTES_PATH } from '@core/router/consts';
import useAuth from '@core/store/context/hooks/useAuth';
import LinkButton from '@shared/design-system/link-button';
import HomeLink from './home-link';
import HeaderActions from './header-actions';
import styles from './styles.module.css';

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className={styles.content}>
      <HomeLink />
      {isAuthenticated ? <HeaderActions /> : <LinkButton to={ROUTES_PATH.login}>Login</LinkButton>}
    </header>
  );
};

export default Header;
