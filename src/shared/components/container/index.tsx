import React from 'react';
import { twMerge } from 'tailwind-merge';

import ContainerContent from '@shared/components/container/container-content';
import ContainerFooter from '@shared/components/container/container-footer';
import Title from '@shared/components/title';
import type { TIcons } from '@shared/design-system_old/assets/icons/types';

type TContainerProps = {
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  bodyClassName?: string;
  border?: boolean;
  icon?: TIcons;
  title?: React.ReactNode;
};

function Container({
  children,
  className,
  titleClassName = '',
  bodyClassName = '',
  border,
  icon,
  title,
}: TContainerProps) {
  return (
    <div
      data-border={border}
      className={twMerge(
        'rounded-lg data-[border=true]:ring-2 data-[border=true]:ring-primary p-2 flex flex-col gap-y-4 px-2',
        className,
      )}
    >
      {title && (
        <Title className={titleClassName} icon={icon}>
          {title}
        </Title>
      )}

      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

Container.Content = ContainerContent;
Container.Footer = ContainerFooter;

export default Container;
