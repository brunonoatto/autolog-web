import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import useAuth from '@core/store/context/AuthContext/hook';

type THomeLink = { className?: string };
const HomeLink = ({ className }: THomeLink) => {
  const { isAuthenticated } = useAuth();

  return (
    <Link
      className={twMerge(
        'max-w-min text-2xl font-bold text-primary rounded-lg border-2 px-4 py-2 shadow-sm shadow-teal-100 hover:shadow-teal-500',
        className,
      )}
      to={isAuthenticated ? '/garage' : '/'}
    >
      AutoLog
    </Link>
  );
};

export default HomeLink;
