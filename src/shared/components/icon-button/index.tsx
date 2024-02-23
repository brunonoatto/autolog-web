import Icon, { type TIconProps } from '../Icon';

type TIconButtonProps = React.HTMLAttributes<HTMLButtonElement> & { icon: TIconProps['name'] };

const IconButton = ({ icon, className, ...otherProps }: TIconButtonProps) => {
  return (
    <button className={`rounded hover:ring-2 hover:ring-teal-500 ${className}`} {...otherProps}>
      <Icon name={icon} />
    </button>
  );
};

export default IconButton;
