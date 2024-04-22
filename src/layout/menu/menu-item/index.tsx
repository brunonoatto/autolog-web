import LinkButton from '@shared/design-system/ui/link-button';

import type { TMenu } from '../types';

type TMenuItemProps = TMenu & { isActive: boolean };
const MenuItem = ({ route, title, isActive }: TMenuItemProps) => {
  return (
    <LinkButton to={route} variant={isActive ? 'outline-active' : 'outline'}>
      {title}
    </LinkButton>
  );
};

export default MenuItem;
