import { RefreshCw } from 'lucide-react';

import { cn } from '@shared/design-system/helpers/utils';
import Icon, { TIconProps } from '@shared/design-system/ui/icon';

type TLoadingIconProps = Omit<TIconProps, 'component'>;

export default function LoadingIcon({ className, ...otherProps }: TLoadingIconProps) {
  return (
    <Icon
      {...otherProps}
      className={cn('inline text-primary animate-spin', className)}
      component={RefreshCw}
    />
  );
}
