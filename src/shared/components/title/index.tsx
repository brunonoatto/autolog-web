import type { TIcons } from '@shared/design-system_old/assets/icons/types';
import Icon from '@shared/design-system_old/Icon';

type TTitleProps = {
  children: React.ReactNode;
  icon?: TIcons;
};

export default function Title({ children, icon }: TTitleProps) {
  return (
    <h2 className="flex gap-2 border-b-2 border-teal-800 w-11/12 md:w-3/4 pb-1 pl-1">
      {icon && <Icon name={icon} />}
      {children}
    </h2>
  );
}
