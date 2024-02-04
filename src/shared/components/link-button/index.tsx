import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const LinkButton: FunctionComponent<React.ComponentProps<typeof Link>> = ({ className = '', ...otherProps }) => {
  return (
    <Link
      className={`flex text-center items-center justify-center text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800 ${className}`}
      {...otherProps}
    />
  );
};

export default LinkButton;
