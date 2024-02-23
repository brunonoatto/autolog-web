import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useAuthStore, useLoadingStore } from '@core/store/hooks';

const Logout = () => {
  const navigate = useNavigate();

  const loading = useLoadingStore((props) => props.loading);
  const signout = useAuthStore((props) => props.signout);

  useEffect(() => {
    const handleLogout = async () => {
      await signout();
      navigate(ROUTES_PATH.root, { replace: true });
    };

    loading(true);
    setTimeout(async () => {
      await handleLogout();
      loading(false);
    }, 2000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="mt-10 text-center">Saindo do sistema...</div>;
};

export default Logout;
