import styles from './styles.module.css';

import { useNavigate } from 'react-router-dom';
import Button from '@shared/components/button';
import { useAuthStore } from '@core/auth';

const Header = () => {
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore((props) => props.isAuthenticated);
  const username = useAuthStore((props) => props.username);
  const signin = useAuthStore((props) => props.signin);
  const signout = useAuthStore((props) => props.signout);

  const handleLoginClick = async () => {
    await signin('brunonoatto');
    navigate('/prestador-servico');
  };

  const handleLooutClick = async () => {
    await signout();
    navigate('/', { replace: true });
  };

  return (
    <header className={styles.header}>
      <b>AutoLog</b>

      {isAuthenticated ? (
        <div>
          <Button className="float-end" onClick={handleLooutClick}>
            Logout
          </Button>
          <div className="text-xs">Usuário: {username}</div>
        </div>
      ) : (
        <Button onClick={handleLoginClick}>Login</Button>
      )}
    </header>
  );
};

export default Header;
