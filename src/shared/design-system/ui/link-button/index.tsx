import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import type { TRoute } from '@core/router/consts';
import { buttonVariants, type TButtonProps } from '@shared/design-system/ui/button';

type TLinkButtonProps = Omit<React.ComponentProps<typeof Link>, 'to'> &
  Pick<TButtonProps, 'variant' | 'size'> & {
    to: TRoute;
  };

// TODO: tentar colocar os estilos do botão aqui
const LinkButton: FunctionComponent<TLinkButtonProps> = ({
  className = '',
  variant,
  size,
  ...otherProps
}) => {
  return <Link className={buttonVariants({ variant, size, className })} {...otherProps} />;
};

export default LinkButton;
