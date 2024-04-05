import { twMerge } from 'tailwind-merge';

import ContainerContent from '@shared/components/container-content';
import ContainerFooter from '@shared/components/container-footer';
import Title from '@shared/components/title';
import type { TIcons } from '@shared/design-system/assets/icons/types';

type TContainerProps = {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
  icon?: TIcons;
  title?: string;
};

function Container({ children, className, border, icon, title }: TContainerProps) {
  return (
    <div
      data-border={border}
      className={twMerge(
        'rounded-lg data-[border=true]:ring-2 data-[border=true]:ring-teal-700 p-2 flex flex-col gap-y-2 px-2',
        className,
      )}
    >
      {title && (
        <div className="pt-2 ">
          <Title icon={icon}>{title}</Title>
        </div>
      )}
      {children}
    </div>
  );
}

Container.Content = ContainerContent;
Container.Footer = ContainerFooter;

export default Container;
