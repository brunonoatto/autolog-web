import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { buttonVariants, type TButtonProps } from '@shared/design-system/ui/button';

type TLinkButtonProps = React.ComponentProps<typeof Link> & Pick<TButtonProps, 'variant' | 'size'>;

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
