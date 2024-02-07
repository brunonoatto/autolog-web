import * as icons from '@assets/icons';
import { TIcons } from '@assets/icons/types';

export type TIconProps = { icon: TIcons };
const Icon = ({ icon }: TIconProps) => {
  const Icon = icons[icon];

  return <Icon />;
};

export default Icon;
