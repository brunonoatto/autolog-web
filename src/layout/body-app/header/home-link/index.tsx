import { Link } from 'react-router-dom';

import useAuth from '@core/store/context/hooks/useAuth';
import { twMerge } from 'tailwind-merge';

type THomeLink = { className?: string };
const HomeLink = ({ className }: THomeLink) => {
  const { isAuthenticated } = useAuth();

  return (
    <Link
      className={twMerge(
        'max-w-min text-2xl font-bold text-neutral-100 rounded-lg border-2 border-teal-500 px-4 py-2 shadow-sm shadow-teal-100 hover:shadow-teal-500',
        className,
      )}
      to={isAuthenticated ? '/garage/dashboard' : '/'}
    >
      AutoLog
    </Link>
  );
};

export default HomeLink;
