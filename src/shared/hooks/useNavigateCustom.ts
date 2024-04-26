import { NavigateOptions, useNavigate } from 'react-router-dom';

import { TRoute } from '@core/router/consts';
import urlJoin from '@shared/helpers/string/urlJoin';

type TRouteArr = [TRoute, ...string[]];

export default function useNavigateCustom() {
  const navigateRouter = useNavigate();

  const navigate = (route: TRoute | number | TRouteArr, options?: NavigateOptions) => {
    if (typeof route === 'number') {
      navigateRouter(route as number);
    } else if (Array.isArray(route)) {
      navigateRouter(urlJoin(...route));
    } else {
      navigateRouter(route, options);
    }
  };

  return navigate;
}
