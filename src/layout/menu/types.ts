import type { TRoute } from '@core/router/consts';
import type { TIcons } from '@shared/design-system/ui/icon';

export type TMenu = {
  title: string;
  route: TRoute;
  icon?: TIcons;
};
