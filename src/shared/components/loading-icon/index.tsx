import { twMerge } from 'tailwind-merge';

import Icon from '@shared/design-system/ui/icon';

type TLoadingIconProps = {
  className?: string;
};

export default function LoadingIcon({ className }: TLoadingIconProps) {
  return (
    <Icon className={twMerge('inline text-primary animate-spin', className)} name="rotate-cw" />
  );
}
