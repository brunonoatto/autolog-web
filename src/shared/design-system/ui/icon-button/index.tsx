import { Button, type TButtonProps } from '@shared/design-system/ui/button';
import Icon, { TIconProps, TIcons } from '@shared/design-system/ui/icon';

export type TIconButtonProps = TButtonProps & {
  icon: TIcons;
  iconProps?: TIconProps;
};

const IconButton = ({ children, size, icon, iconProps, ...otherProps }: TIconButtonProps) => {
  return (
    <Button size={size} {...otherProps}>
      <Icon name={icon} size={size === 'sm' ? '1.2rem' : '1.5rem'} {...iconProps} />
      {children}
    </Button>
  );
};

export default IconButton;
