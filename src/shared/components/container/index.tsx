import { twMerge } from 'tailwind-merge';

import ContainerContent from '@shared/components/container-content';
import ContainerFooter from '@shared/components/container-footer';
import type { TIcons } from '@shared/design-system/assets/icons/types';
import Icon from '@shared/design-system/Icon';

type TContainerProps = {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
  icon?: TIcons;
  title: string;
};

function Container({ children, className, border, icon, title }: TContainerProps) {
  return (
    <div
      data-border={border}
      className={twMerge(
        'rounded-lg data-[border=true]:ring-2 data-[border=true]:ring-teal-700 m-2 mt-1 p-2 pt-1 space-y-4 flex flex-col',
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

Container.Content = ContainerContent;
Container.Footer = ContainerFooter;

export default Container;
