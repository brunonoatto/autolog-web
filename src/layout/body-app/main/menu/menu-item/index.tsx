import Icon from '@shared/design-system/ui/icon';
import LinkButton from '@shared/design-system/ui/link-button';

import type { TMenu } from '../types';

type TMenuItemProps = TMenu & { isActive: boolean };
const MenuItem = ({ route, title, icon, isActive }: TMenuItemProps) => {
  return (
    <LinkButton to={route} variant={isActive ? 'outline-active' : 'outline'} className="gap-2 ">
      {icon && <Icon name={icon} />}
      {title}
    </LinkButton>
  );
};

export default MenuItem;
