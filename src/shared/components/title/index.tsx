import { twMerge } from 'tailwind-merge';

import type { TIcons } from '@shared/design-system_old/assets/icons/types';
import Icon from '@shared/design-system_old/Icon';

type TTitleProps = {
  children: React.ReactNode;
  className?: string;
  icon?: TIcons;
};

export default function Title({ children, className, icon }: TTitleProps) {
  return (
    <h2
      className={twMerge(
        'text-2xl font-semibold flex gap-2 border-b-[1px] border-primary w-11/12 md:w-3/4 pb-1 pl-1',
        className,
      )}
    >
      {icon && <Icon name={icon} />}
      {children}
    </h2>
  );
}
