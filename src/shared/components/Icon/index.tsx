import * as icons from '@assets/icons';
import { TIcons } from '@assets/icons/types';

const sizeNumber = {
  small: 24,
  medium: 32,
  large: 46,
};

type TSize = 'small' | 'medium' | 'large';

export type TIconProps = Omit<React.SVGProps<SVGSVGElement>, 'size'> & {
  name: TIcons;
  size?: TSize;
};
const Icon = ({ name, size = 'medium', ...otherProps }: TIconProps) => {
  const SvgIcon = icons[name];

  return <SvgIcon width={sizeNumber[size]} height={sizeNumber[size]} {...otherProps} />;
};

export default Icon;
