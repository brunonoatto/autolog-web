import Icon, { TIconProps } from '../Icon';

type TIconButtonProps = React.HTMLAttributes<HTMLButtonElement> & TIconProps;

const IconButton = ({ icon, className, ...otherProps }: TIconButtonProps) => {
  return (
    <button className={`rounded hover:ring-2 hover:ring-teal-500 ${className}`} {...otherProps}>
      <Icon icon={icon} />
    </button>
  );
};

export default IconButton;
