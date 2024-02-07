import { useNavigate } from 'react-router-dom';

import Button from '@shared/components/button';
import { useAuthStore } from '@core/auth';
import styles from './styles.module.css';
import HomeLink from './home-link';
import IconButton from '@shared/components/icon-button';

const Header = () => {
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore((props) => props.isAuthenticated);
  const username = useAuthStore((props) => props.username);
  const signin = useAuthStore((props) => props.signin);
  const signout = useAuthStore((props) => props.signout);

  const handleLoginClick = async () => {
    await signin('brunonoatto');
    // navigate('/prestador-servico');
    navigate('/prestador-servico/dashboard');
  };

  const handleLooutClick = async () => {
    await signout();
    navigate('/', { replace: true });
  };

  return (
    <header className={styles.content}>
      <HomeLink isAuthenticated={isAuthenticated} />

      {isAuthenticated ? (
        <div>
          <IconButton className="float-right" icon="ArrowDownLineIcon" onClick={handleLooutClick} />
          <div className="text-xs">Usuário: {username}</div>
        </div>
      ) : (
        <Button onClick={handleLoginClick}>Login</Button>
      )}
    </header>
  );
};

export default Header;
