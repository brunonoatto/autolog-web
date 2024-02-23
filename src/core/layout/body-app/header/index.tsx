import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@core/store/hooks';
import Button from '@shared/design-system/button';
import HomeLink from './home-link';
import HeaderActions from './header-actions';
import styles from './styles.module.css';

const Header = () => {
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore((props) => props.isAuthenticated);
  const signin = useAuthStore((props) => props.signin);

  const handleLoginClick = async () => {
    await signin('brunonoatto');
    navigate('/prestador-servico/dashboard');
  };

  return (
    <header className={styles.content}>
      <HomeLink isAuthenticated={isAuthenticated} />

      {isAuthenticated ? <HeaderActions /> : <Button onClick={handleLoginClick}>Login</Button>}
    </header>
  );
};

export default Header;
