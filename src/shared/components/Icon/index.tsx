import * as icons from '@assets/icons';
import { TIcons } from '@assets/icons/types';

export type TIconProps = React.SVGProps<SVGSVGElement> & { icon: TIcons };
const Icon = ({ icon, ...otherProps }: TIconProps) => {
  const Icon = icons[icon];

  return <Icon {...otherProps} />;
};

export default Icon;
