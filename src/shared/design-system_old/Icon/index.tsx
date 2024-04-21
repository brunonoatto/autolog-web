import type { TSize } from '@shared/design-system_old/_types';
import * as icons from '@shared/design-system_old/assets/icons';
import type { TIcons } from '@shared/design-system_old/assets/icons/types';

const sizeData: { [key in TSize]: number } = {
  small: 20,
  medium: 26,
  large: 34,
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
