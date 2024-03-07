import * as icons from '@shared/design-system/assets/icons';
import { TIcons } from '@shared/design-system/assets/icons/types';

type TSize = 'small' | 'medium' | 'large';

const sizeData: { [key in TSize]: number } = {
  small: 24,
  medium: 32,
  large: 46,
};

export type TIconProps = Omit<React.SVGProps<SVGSVGElement>, 'size'> & {
  name: TIcons;
  size?: TSize;
};
const Icon = ({ name, size = 'medium', ...otherProps }: TIconProps) => {
  const SvgIcon = icons[name];

  return <SvgIcon width={sizeData[size]} height={sizeData[size]} {...otherProps} />;
};

export default Icon;
