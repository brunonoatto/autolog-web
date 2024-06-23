import { cva, type VariantProps } from 'class-variance-authority';
import { Link } from 'react-router-dom';

import useAuth from '@core/store/context/AuthContext/hook';
import { cn } from '@shared/design-system/helpers/utils';

const homeLinkVariants = cva(
  'block max-w-min text-2xl font-bold text-primary rounded-lg border-2 px-4 py-2 shadow-sm shadow-teal-100 hover:shadow-teal-500',
  {
    variants: {
      center: {
        true: 'm-auto',
      },
    },
    defaultVariants: {
      center: false,
    },
  },
);

type THomeLink = VariantProps<typeof homeLinkVariants> & {
  className?: string;
};

const HomeLink = ({ className, center }: THomeLink) => {
  const { isAuthenticated } = useAuth();

  return (
    <Link
      className={cn(homeLinkVariants({ center }), className)}
      to={isAuthenticated ? '/garage' : '/'}
    >
      AutoLog
    </Link>
  );
};

export default HomeLink;
