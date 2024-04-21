import { ROUTES_PATH } from '@core/router/consts';
import useAuth from '@core/store/context/hooks/useAuth';
import LinkButton from '@shared/design-system_old/link-button';

import HeaderActions from './header-actions';
import HomeLink from './home-link';
import styles from './styles.module.css';

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className={styles.content}>
      <HomeLink />
      {isAuthenticated ? <HeaderActions /> : <LinkButton to={ROUTES_PATH.login}>Login</LinkButton>}
    </header>
  );
}
