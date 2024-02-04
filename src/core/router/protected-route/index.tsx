import { useAuthStore } from '@core/auth';
import type { FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute: FunctionComponent<any> = ({ children }) => {
  const username = useAuthStore((props) => props.username);

  if (!username) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
