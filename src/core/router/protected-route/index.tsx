import { Navigate, Outlet } from 'react-router-dom';

import type { TUserType } from '@core/api/auth/types';
import { ROUTES_PATH } from '@core/router/consts';
import useAuth from '@core/store/context/hooks/useAuth';

type TProtectedRouteParams = {
  isPrivate: boolean;
  routeUserType?: TUserType;
};

export default function ProtectedRoute({ isPrivate, routeUserType }: TProtectedRouteParams) {
  const { isAuthenticated, getTokenData } = useAuth();

  if (isAuthenticated) {
    const tokenData = getTokenData();
    if (isPrivate) {
      if (routeUserType !== tokenData.type) {
        if (tokenData.type === 'client') {
          return <Navigate to={ROUTES_PATH.clientHome} replace />;
        }

        return <Navigate to={ROUTES_PATH.garageHome} replace />;
      }
    } else {
      if (tokenData.type === 'client') {
        return <Navigate to={ROUTES_PATH.clientHome} replace />;
      }

      return <Navigate to={ROUTES_PATH.garageHome} replace />;
    }
  }

  if (!isAuthenticated && isPrivate) {
    return <Navigate to={ROUTES_PATH.login} />;
  }

  return <Outlet />;
}
