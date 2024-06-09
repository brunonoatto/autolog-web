import { twMerge } from 'tailwind-merge';

import Icon, { TIconProps } from '@shared/design-system/ui/icon';

type TLoadingIconProps = Omit<TIconProps, 'name'>;

export default function LoadingIcon({ className, ...otherProps }: TLoadingIconProps) {
  return (
    <Icon
      className={twMerge('inline text-primary animate-spin', className)}
      name="rotate-cw"
      {...otherProps}
    />
  );
}
