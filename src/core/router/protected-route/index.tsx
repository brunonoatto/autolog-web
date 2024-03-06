import type { PropsWithChildren } from 'react';

import { Navigate } from 'react-router-dom';

import { useAuthStore } from '@core/store/hooks';

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const user = useAuthStore((props) => props.user);

  if (!user?.username) {
    return <Navigate to="/" />;
  }

  return children;
}
