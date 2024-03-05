import Icon, { type TIconProps } from '../Icon';

type TIconButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  icon: TIconProps['name'];
  iconProps?: Omit<TIconProps, 'name'>;
};

const IconButton = ({ icon, className = '', iconProps = {}, ...otherProps }: TIconButtonProps) => {
  const { className: classNameIcon = '', ...otherIconProps } = iconProps;
  return (
    <button className={`rounded  ${className}`} {...otherProps}>
      <Icon name={icon} className={`${classNameIcon} hover:fill-teal-500`} {...otherIconProps} />
    </button>
  );
};

export default IconButton;
