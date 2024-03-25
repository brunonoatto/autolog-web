import Icon from '@shared/design-system/Icon';
import { TIcons } from '@shared/design-system/assets/icons/types';
import { twMerge } from 'tailwind-merge';

type TContainerProps = {
  children: React.ReactNode;
  title: string;
  icon?: TIcons;
  className?: string;
};

export default function Container({ children, title, icon, className }: TContainerProps) {
  return (
    <div className={twMerge('rounded-lg border-2 border-teal-700 p-2 space-y-4', className)}>
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
