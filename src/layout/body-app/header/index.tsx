import { useAuth } from '@core/store/context/AuthContext';
import LinkButton from '@shared/design-system/ui/link-button';

import HeaderActions from './header-actions';
import HomeLink from './home-link';
import styles from './styles.module.css';

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className={styles.content}>
      <HomeLink />
      {isAuthenticated ? <HeaderActions /> : <LinkButton to="/login">Login</LinkButton>}
    </header>
  );
}
