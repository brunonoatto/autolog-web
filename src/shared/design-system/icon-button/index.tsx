import { twMerge } from 'tailwind-merge';
import Icon, { type TIconProps } from '../Icon';
import Button, { type TButtonProps } from '@shared/design-system/button';

export type TIconButtonProps = TButtonProps & {
  icon: TIconProps['name'];
  iconProps?: Omit<TIconProps, 'name'>;
};

const IconButton = ({ children, size, icon, iconProps = {}, ...otherProps }: TIconButtonProps) => {
  const { className: classNameIcon, ...otherIconProps } = iconProps;
  return (
    <Button size={size} {...otherProps}>
      <div className="flex gap-2 items-center">
        <Icon
          name={icon}
          className={twMerge('hover:fill-teal-500', classNameIcon)}
          size={size}
          {...otherIconProps}
        />
        {children}
      </div>
    </Button>
  );
};

export default IconButton;
