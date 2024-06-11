import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import type { TRoute } from '@core/router/types';
import { cn } from '@shared/design-system/helpers/utils';
import { buttonVariants, type TButtonProps } from '@shared/design-system/ui/button';
import Icon, { TIconProps, TIcons } from '@shared/design-system/ui/icon';

type TLinkButtonProps = Omit<React.ComponentProps<typeof Link>, 'to'> &
  Pick<TButtonProps, 'variant' | 'size'> & {
    to: TRoute;
    icon?: TIcons;
    iconProps?: TIconProps;
  };

// TODO: tentar colocar os estilos do botão aqui
const LinkButton: FunctionComponent<TLinkButtonProps> = ({
  className = '',
  variant,
  size,
  icon,
  iconProps,
  children,
  ...otherProps
}) => {
  return (
    <Link className={cn(buttonVariants({ variant, size }), className)} {...otherProps}>
      {icon && <Icon name={icon as TIcons} size={size === 'icon' ? 'sm' : size} {...iconProps} />}
      {children}
    </Link>
  );
};

export default LinkButton;
