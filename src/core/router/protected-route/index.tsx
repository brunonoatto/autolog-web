import type { FunctionComponent, PropsWithChildren } from 'react';

import { Navigate } from 'react-router-dom';

import { useAuthStore } from '@core/store/hooks';

export const ProtectedRoute: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const username = useAuthStore((props) => props.username);

  if (!username) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
