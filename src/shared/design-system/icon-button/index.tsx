import { twMerge } from 'tailwind-merge';
import Icon, { type TIconProps } from '../Icon';

type TIconButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  icon: TIconProps['name'];
  iconProps?: Omit<TIconProps, 'name'>;
};

const IconButton = ({ icon, className, iconProps = {}, ...otherProps }: TIconButtonProps) => {
  const { className: classNameIcon, ...otherIconProps } = iconProps;
  return (
    <button className={twMerge('rounded', className)} {...otherProps}>
      <Icon
        name={icon}
        className={twMerge('hover:fill-teal-500', classNameIcon)}
        {...otherIconProps}
      />
    </button>
  );
};

export default IconButton;
