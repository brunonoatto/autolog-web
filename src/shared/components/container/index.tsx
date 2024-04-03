import { twMerge } from 'tailwind-merge';

import type { TIcons } from '@shared/design-system/assets/icons/types';
import Icon from '@shared/design-system/Icon';

type TContainerProps = {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
  icon?: TIcons;
  title: string;
};

export default function Container({ children, className, border, icon, title }: TContainerProps) {
  return (
    <div
      data-border={border}
      className={twMerge(
        'rounded-lg data-[border=true]:ring-2 data-[border=true]:ring-teal-700 p-2 space-y-4',
        className,
      )}
    >
      {title && (
        <h2 className="flex gap-2 border-b-2 border-teal-800 w-3/4 pb-1 pl-1">
          {icon && <Icon name={icon} />}
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
