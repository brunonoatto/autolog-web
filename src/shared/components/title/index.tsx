import type { TIcons } from '@shared/design-system/assets/icons/types';
import Icon from '@shared/design-system/Icon';

type TTitleProps = {
  title: string;
  icon?: TIcons;
};

export default function Title({ title, icon }: TTitleProps) {
  return (
    <h2 className="flex gap-2 border-b-2 border-teal-800 w-3/4 pb-1 pl-1">
      {icon && <Icon name={icon} />}
      {title}
    </h2>
  );
}
