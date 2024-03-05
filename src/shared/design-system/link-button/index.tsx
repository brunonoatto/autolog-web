import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const LinkButton: FunctionComponent<React.ComponentProps<typeof Link>> = ({
  className = '',
  ...otherProps
}) => {
  return (
    <Link
      className={`text-center bg-teal-800 hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-3 py-2.5 focus:outline-none ${className}`}
      {...otherProps}
    />
  );
};

export default LinkButton;
