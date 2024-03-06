import { ROUTES_PATH } from '@core/router/consts';
import { useAuthStore } from '@core/store/hooks';
import LinkButton from '@shared/design-system/link-button';
import HomeLink from './home-link';
import HeaderActions from './header-actions';
import styles from './styles.module.css';

const Header = () => {
  const isAuthenticated = useAuthStore((props) => props.isAuthenticated);

  return (
    <header className={styles.content}>
      <HomeLink isAuthenticated={isAuthenticated} />
      {isAuthenticated ? <HeaderActions /> : <LinkButton to={ROUTES_PATH.login}>Login</LinkButton>}
    </header>
  );
};

export default Header;
