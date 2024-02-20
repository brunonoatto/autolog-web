import * as icons from '@assets/icons';
import { TIcons } from '@assets/icons/types';

export type TIconProps = React.SVGProps<SVGSVGElement> & { name: TIcons };
const Icon = ({ name, ...otherProps }: TIconProps) => {
  const Icon = icons[name];

  return <Icon {...otherProps} />;
};

export default Icon;
