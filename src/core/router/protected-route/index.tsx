import { Navigate, Outlet, useLocation, useSearchParams } from 'react-router-dom';

import { TUserType } from '@core/api/auth/types';
import { ROUTES_PATH } from '@core/router/consts';
import useAuth from '@core/store/context/AuthContext/hook';

type TProtectedRouteParams = {
  isPrivate: boolean;
  routeUserType?: TUserType;
};

export default function ProtectedRoute({ isPrivate, routeUserType }: TProtectedRouteParams) {
  const { isAuthenticated, getTokenData } = useAuth();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const goto = searchParams.get('goto');
  if (isAuthenticated && goto && pathname.includes('login')) {
    return <Navigate to={goto} replace />;
  }

  if (isAuthenticated) {
    const tokenData = getTokenData();

    if (!tokenData) {
      return <Navigate to={ROUTES_PATH.login} />;
    }

    if (isPrivate) {
      if (routeUserType !== tokenData.type) {
        if (tokenData.type === 'Client') {
          return <Navigate to={ROUTES_PATH.clientHome} replace />;
        }

        return <Navigate to={ROUTES_PATH.garageHome} replace />;
      }
    } else {
      if (tokenData.type === 'Client') {
        return <Navigate to={ROUTES_PATH.clientHome} replace />;
      }

      return <Navigate to={ROUTES_PATH.garageHome} replace />;
    }
  }

  if (!isAuthenticated && isPrivate) {
    // TODO: ao clicar em sair, não deve enviar o goto
    return <Navigate to={`${ROUTES_PATH.login}?goto=${pathname}`} />;
  }

  return <Outlet />;
}
